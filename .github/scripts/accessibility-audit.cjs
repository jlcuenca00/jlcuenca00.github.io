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
        const page = await browser.newPage({ viewport });
        const url = `http://127.0.0.1:4173${path}`;
        await page.goto(url, { waitUntil: 'networkidle' });

        const results = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
          .analyze();

        const overflow = await page.evaluate(() => ({
          scrollWidth: document.documentElement.scrollWidth,
          clientWidth: document.documentElement.clientWidth,
        }));

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
        } else if (viewport.width === 320) {
          console.log('  reflow: no horizontal page overflow');
        }

        await page.close();
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
