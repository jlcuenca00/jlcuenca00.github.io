const { chromium } = require('playwright');
const AxeBuilder = require('@axe-core/playwright').default;

const pages = [
  ['Landing', '/'],
  ['Developer', '/developer/'],
  ['Creator', '/photography/'],
];

const viewports = [
  ['desktop', { width: 1440, height: 900 }],
  ['reflow-320', { width: 320, height: 800 }],
];

const formatNodes = (nodes) => nodes.slice(0, 5).map((node) => `      ${node.target.join(' ')}`).join('\n');

(async () => {
  const browser = await chromium.launch({ headless: true });
  let failed = false;

  try {
    for (const [pageName, path] of pages) {
      for (const [viewportName, viewport] of viewports) {
        const context = await browser.newContext({ viewport });
        const page = await context.newPage();
        const url = `http://127.0.0.1:4173${path}`;
        await page.goto(url, { waitUntil: 'networkidle' });

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();

        const overflow = await page.evaluate(() => {
          const doc = document.documentElement;
          const viewportWidth = doc.clientWidth;
          const offenders = [...document.querySelectorAll('body *')]
            .map((element) => {
              const rect = element.getBoundingClientRect();
              const style = getComputedStyle(element);
              return {
                tag: element.tagName.toLowerCase(),
                id: element.id || '',
                className: typeof element.className === 'string' ? element.className : '',
                left: Math.round(rect.left),
                right: Math.round(rect.right),
                width: Math.round(rect.width),
                scrollWidth: element.scrollWidth,
                clientWidth: element.clientWidth,
                position: style.position,
                overflowX: style.overflowX,
              };
            })
            .filter((item) => item.width > 0 && (
              item.right > viewportWidth + 1 ||
              item.left < -1 ||
              (item.scrollWidth > item.clientWidth + 1 && item.overflowX === 'visible')
            ))
            .sort((a, b) => Math.max(b.right - viewportWidth, b.scrollWidth - b.clientWidth) - Math.max(a.right - viewportWidth, a.scrollWidth - a.clientWidth))
            .slice(0, 12);

          return {
            scrollWidth: doc.scrollWidth,
            clientWidth: viewportWidth,
            offenders,
          };
        });

        console.log(`\n${pageName} / ${viewportName}`);
        console.log(`  axe violations: ${results.violations.length}`);

        if (results.violations.length) {
          failed = true;
          for (const violation of results.violations) {
            console.log(`  - ${violation.id} [${violation.impact || 'unknown'}]: ${violation.help}`);
            console.log(`    ${violation.helpUrl}`);
            if (violation.nodes.length) console.log(formatNodes(violation.nodes));
          }
        }

        if (viewport.width === 320 && overflow.scrollWidth > overflow.clientWidth + 1) {
          failed = true;
          console.log(`  - reflow: horizontal overflow ${overflow.scrollWidth}px > ${overflow.clientWidth}px`);
          overflow.offenders.forEach((item) => {
            const label = `${item.tag}${item.id ? `#${item.id}` : ''}${item.className ? `.${item.className.trim().replace(/\s+/g, '.')}` : ''}`;
            console.log(`      ${label} left=${item.left} right=${item.right} width=${item.width} scroll=${item.scrollWidth}/${item.clientWidth} position=${item.position}`);
          });
        } else if (viewport.width === 320) {
          console.log('  reflow: no horizontal page overflow');
        }

        await context.close();
      }
    }
  } finally {
    await browser.close();
  }

  if (failed) {
    console.error('\nAccessibility audit failed. Review the violations above.');
    process.exit(1);
  }

  console.log('\nAccessibility audit passed for automated WCAG checks.');
})();
