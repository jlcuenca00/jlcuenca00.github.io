(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!document.body.matches('.dev-page, .photography-page')) return;

    const canvas = document.createElement('canvas');
    canvas.className = 'dual-signal-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.prepend(canvas);

    const gl = canvas.getContext('webgl', {
        alpha: true,
        antialias: false,
        depth: false,
        stencil: false,
        powerPreference: 'low-power',
    });
    if (!gl) {
        canvas.remove();
        return;
    }

    const vertexSource = `
        attribute vec2 a_position;
        void main() {
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
    `;

    const fragmentSource = `
        precision mediump float;
        uniform vec2 u_resolution;
        uniform vec2 u_mouse;
        uniform float u_time;
        uniform float u_scroll;
        uniform float u_mode;
        uniform float u_state;

        float hash21(vec2 p) {
            p = fract(p * vec2(123.34, 456.21));
            p += dot(p, p + 45.32);
            return fract(p.x * p.y);
        }

        float line(float value, float width) {
            return 1.0 - smoothstep(width, width + 0.008, abs(value));
        }

        float gridLine(vec2 p, float scale) {
            vec2 g = abs(fract(p * scale) - 0.5);
            float gx = smoothstep(0.455, 0.495, g.x);
            float gy = smoothstep(0.455, 0.495, g.y);
            return max(gx, gy);
        }

        void main() {
            vec2 uv = gl_FragCoord.xy / u_resolution.xy;
            vec2 p = uv - 0.5;
            p.x *= u_resolution.x / max(u_resolution.y, 1.0);

            vec2 mouse = u_mouse / u_resolution.xy - 0.5;
            mouse.x *= u_resolution.x / max(u_resolution.y, 1.0);

            float t = u_time * 0.12;
            float mouseDist = length(p - mouse);
            float mouseGlow = exp(-mouseDist * 5.5);
            float edgeFade = smoothstep(0.95, 0.12, length(p));
            float grain = (hash21(gl_FragCoord.xy + floor(u_time * 10.0)) - 0.5) * 0.018;

            vec3 color = vec3(0.0);

            if (u_mode < 0.5) {
                // DATA / Developer — grid, parcel-like contour signals, scan traces.
                vec2 gp = p;
                gp.y += u_scroll * 0.00045;
                float gridFine = gridLine(gp, 15.0) * 0.075;
                float gridCoarse = gridLine(gp + vec2(0.03, -0.01), 4.0) * 0.055;

                float c1 = line(sin((p.x * 5.1 + sin(p.y * 4.0 + t)) * 2.2) * 0.18 + p.y * 0.24, 0.014);
                float c2 = line(sin((p.y * 5.4 + cos(p.x * 3.1 - t)) * 2.0) * 0.17 - p.x * 0.21, 0.012);
                float contour = max(c1, c2) * (0.08 + 0.055 * u_state);

                float crossX = line(p.x - mouse.x, 0.0016) * exp(-abs(p.y - mouse.y) * 4.0);
                float crossY = line(p.y - mouse.y, 0.0016) * exp(-abs(p.x - mouse.x) * 4.0);
                float scanner = max(crossX, crossY) * 0.11;

                vec3 red = vec3(1.0, 0.055, 0.055);
                color += red * (gridFine + gridCoarse + contour + scanner);
                color += red * mouseGlow * (0.055 + u_state * 0.025);
                color += vec3(0.12) * grain;
            } else {
                // LIGHT / Creator — optical rings, refraction bands and blue exposure haze.
                float r = length(p - mouse * 0.35);
                float ring1 = line(sin(r * 25.0 - t * 3.0), 0.065) * 0.035;
                float ring2 = line(sin((r + p.x * 0.08) * 41.0 + t * 2.0), 0.06) * 0.018;
                float beam = exp(-abs(p.y + sin(p.x * 2.4 + t) * 0.14) * 7.0) * 0.035;
                float flare = exp(-length(p - mouse) * 3.8) * 0.095;
                float vignette = smoothstep(0.95, 0.18, length(p));

                vec3 blue = vec3(0.05, 0.26, 1.0);
                vec3 cyan = vec3(0.08, 0.55, 1.0);
                color += blue * (ring1 + ring2 + beam);
                color += mix(blue, cyan, uv.y) * (flare + mouseGlow * 0.022);
                color += vec3(0.035, 0.045, 0.075) * vignette * 0.35;
                color += vec3(grain * 0.55);
            }

            color *= edgeFade;
            gl_FragColor = vec4(color, 0.78);
        }
    `;

    function compile(type, source) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.warn('Dual Signal shader unavailable:', gl.getShaderInfoLog(shader));
            gl.deleteShader(shader);
            return null;
        }
        return shader;
    }

    const vertex = compile(gl.VERTEX_SHADER, vertexSource);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentSource);
    if (!vertex || !fragment) {
        canvas.remove();
        return;
    }

    const program = gl.createProgram();
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.warn('Dual Signal program unavailable:', gl.getProgramInfoLog(program));
        canvas.remove();
        return;
    }

    gl.useProgram(program);
    const position = gl.getAttribLocation(program, 'a_position');
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, -1,1, 1,-1, 1,1]), gl.STATIC_DRAW);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
        resolution: gl.getUniformLocation(program, 'u_resolution'),
        mouse: gl.getUniformLocation(program, 'u_mouse'),
        time: gl.getUniformLocation(program, 'u_time'),
        scroll: gl.getUniformLocation(program, 'u_scroll'),
        mode: gl.getUniformLocation(program, 'u_mode'),
        state: gl.getUniformLocation(program, 'u_state'),
    };

    const isCreator = document.body.classList.contains('photography-page');
    let mouseX = innerWidth * 0.5;
    let mouseY = innerHeight * 0.5;
    let targetX = mouseX;
    let targetY = mouseY;
    let state = 0;
    let targetState = 0;
    let raf = 0;

    const resize = () => {
        const dpr = Math.min(devicePixelRatio || 1, 1.5);
        const width = Math.max(1, Math.floor(innerWidth * dpr));
        const height = Math.max(1, Math.floor(innerHeight * dpr));
        if (canvas.width !== width || canvas.height !== height) {
            canvas.width = width;
            canvas.height = height;
            canvas.style.width = `${innerWidth}px`;
            canvas.style.height = `${innerHeight}px`;
            gl.viewport(0, 0, width, height);
        }
    };

    window.addEventListener('pointermove', (event) => {
        targetX = event.clientX;
        targetY = innerHeight - event.clientY;
    }, { passive: true });

    document.addEventListener('portfolio:projectchange', (event) => {
        targetState = Math.min(1, Math.max(0, Number(event.detail?.index ?? 0) / 2));
    });

    const render = (now) => {
        resize();
        mouseX += (targetX - mouseX) * 0.07;
        mouseY += (targetY - mouseY) * 0.07;
        state += (targetState - state) * 0.06;

        const dprX = canvas.width / Math.max(innerWidth, 1);
        const dprY = canvas.height / Math.max(innerHeight, 1);
        gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
        gl.uniform2f(uniforms.mouse, mouseX * dprX, mouseY * dprY);
        gl.uniform1f(uniforms.time, now * 0.001);
        gl.uniform1f(uniforms.scroll, scrollY || 0);
        gl.uniform1f(uniforms.mode, isCreator ? 1 : 0);
        gl.uniform1f(uniforms.state, state);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
        raf = requestAnimationFrame(render);
    };

    document.addEventListener('visibilitychange', () => {
        if (document.hidden && raf) {
            cancelAnimationFrame(raf);
            raf = 0;
        } else if (!document.hidden && !raf) {
            raf = requestAnimationFrame(render);
        }
    });

    raf = requestAnimationFrame(render);
})();