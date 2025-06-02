import { useEffect, useRef, useState } from 'react';
import REGL, { Regl } from 'regl';
import { motion, AnimatePresence } from 'framer-motion';

const ShaderBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reglRef = useRef<Regl | null>(null);
  const [mouse, setMouse] = useState<[number, number]>([0.5, 0.5]);
  const [scroll, setScroll] = useState(0);

  // Scroll sync
  useEffect(() => {
    const handleScroll = () => setScroll(window.scrollY * 0.01);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const regl = REGL({
      canvas,
      attributes: { alpha: true, antialias: true },
      extensions: ['OES_standard_derivatives', 'OES_texture_float'],
    });
    reglRef.current = regl;

    const vertexShader = `
      precision mediump float;
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;
      uniform vec2 mouse;
      varying vec2 vUv;

      float rand(vec2 co) {
        return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
      }

      float noise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = rand(i);
        float b = rand(i + vec2(1.0, 0.0));
        float c = rand(i + vec2(0.0, 1.0));
        float d = rand(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
      }

      float fbm(vec2 st) {
        float value = 0.0;
        float amplitude = 0.5;
        for (int i = 0; i < 6; i++) {
          value += amplitude * noise(st);
          st *= 2.0;
          amplitude *= 0.5;
        }
        return value;
      }

      void main() {
        vec2 uv = vUv;
        vec2 m = mouse;
        float dist = distance(uv, m);

        vec3 base = mix(vec3(0.02, 0.36, 0.48), vec3(1.0, 0.77, 0.2), uv.y + 0.1 * sin(time));

        float layer1 = fbm(uv * 3.0 + time * 0.2);
        float layer2 = fbm(uv * 6.0 - time * 0.15);
        float layer3 = fbm(uv * 12.0 + time * 0.4);

        base += layer1 * 0.1;
        base += layer2 * 0.07;
        base += layer3 * 0.03;

        // Simulated glow via distance from mouse
        float glow = 0.25 / (dist * dist + 0.05);
        base += glow * vec3(1.0, 0.95, 0.8);

        // Subtle blur simulation via radial fade
        float vignette = smoothstep(1.2, 0.6, distance(uv, vec2(0.5)));
        base *= vignette;

        gl_FragColor = vec4(base * 0.95, 0.85);
      }
    `;

    const draw = regl({
      frag: fragmentShader,
      vert: vertexShader,
      attributes: {
        position: [
          [-1, -1],
          [1, -1],
          [-1, 1],
          [1, 1],
        ],
      },
      uniforms: {
        time: () => scroll,
        resolution: ({ viewportWidth, viewportHeight }) => [viewportWidth, viewportHeight],
        mouse: () => mouse,
      },
      count: 4,
      primitive: 'triangle strip',
    });

    const frame = regl.frame(() => {
      regl.clear({ color: [0, 0, 0, 0], depth: 1 });
      draw();
    });

    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMouse([e.clientX / window.innerWidth, e.clientY / window.innerHeight]);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      frame.cancel();
      regl.destroy();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouse, scroll]);

  return (
    <AnimatePresence>
      <motion.canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        style={{ zIndex: -1 }}
      />
    </AnimatePresence>
  );
};

export default ShaderBackground;
