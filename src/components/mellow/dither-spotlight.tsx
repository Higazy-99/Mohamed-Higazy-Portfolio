import React, { useEffect, useRef, useState } from 'react';

/** Reads a CSS custom property holding a #hex / rgb() color and returns "r, g, b". Re-reads when the theme changes. */
function useCssRgb(name: string, fallback: string): string {
  const [rgb, setRgb] = useState<string>(fallback);

  useEffect(() => {
    const read = () => {
      const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      const hex = value.match(/^#([0-9a-f]{6})$/i);
      if (hex) {
        const n = parseInt(hex[1], 16);
        setRgb(`${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}`);
        return;
      }
      const fn = value.match(/rgba?\(([^)]+)\)/i);
      if (fn) setRgb(fn[1].split(',').slice(0, 3).join(','));
    };

    read();
    const observer = new MutationObserver(read);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'style', 'data-theme'] });
    return () => observer.disconnect();
  }, [name]);

  return rgb;
}

/**
 * Whether pointer-driven effects may run: a fine pointer that can hover, and no reduced-motion preference.
 * `null` until the first effect has run (server render and first browser render), then true / false.
 * Follows changes of all three media queries.
 */
export function useMotionAllowed(): boolean | null {
  const [allowed, setAllowed] = useState<boolean | null>(null);

  useEffect(() => {
    const queries = ['(pointer: coarse)', '(hover: none)', '(prefers-reduced-motion: reduce)'].map((query) => window.matchMedia(query));
    const sync = () => setAllowed(!queries.some((query) => query.matches));
    sync();
    queries.forEach((query) => query.addEventListener('change', sync));
    return () => queries.forEach((query) => query.removeEventListener('change', sync));
  }, []);

  return allowed;
}

/** Canvas pixel ratio: capped at 2, and at 1.5 on small screens. */
export function cappedDpr() {
  return Math.min(window.devicePixelRatio || 1, window.innerWidth <= 720 ? 1.5 : 2);
}

function parseRgb(rgb: string): [number, number, number] {
  const parts = rgb
    .split(',')
    .map((part) => Number.parseFloat(part.trim()))
    .filter((part) => Number.isFinite(part));

  return [(parts[0] ?? 244) / 255, (parts[1] ?? 241) / 255, (parts[2] ?? 236) / 255];
}

function compileShader(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

function createProgram(gl: WebGL2RenderingContext) {
  const vertexShader = compileShader(
    gl,
    gl.VERTEX_SHADER,
    `#version 300 es
    precision highp float;

    const vec2 positions[6] = vec2[6](
      vec2(-1.0, -1.0),
      vec2(1.0, -1.0),
      vec2(-1.0, 1.0),
      vec2(-1.0, 1.0),
      vec2(1.0, -1.0),
      vec2(1.0, 1.0)
    );

    void main() {
      gl_Position = vec4(positions[gl_VertexID], 0.0, 1.0);
    }`,
  );

  const fragmentShader = compileShader(
    gl,
    gl.FRAGMENT_SHADER,
    `#version 300 es
    precision highp float;

    uniform vec2 u_resolution;
    uniform vec2 u_pointer;
    uniform vec3 u_ink;
    uniform vec3 u_background;
    uniform float u_time;
    uniform float u_radius;
    uniform float u_softness;
    uniform float u_dotScale;
    uniform float u_intensity;
    uniform float u_active;
    uniform vec4 u_keep[12];
    uniform int u_keepCount;
    uniform float u_keepFloor;
    uniform float u_keepSoft;

    out vec4 outColor;

    float bayer4(vec2 p) {
      ivec2 ip = ivec2(mod(p, 4.0));
      int i = ip.x + ip.y * 4;
      float v = 0.0;
      if (i == 0) v = 0.0;
      else if (i == 1) v = 8.0;
      else if (i == 2) v = 2.0;
      else if (i == 3) v = 10.0;
      else if (i == 4) v = 12.0;
      else if (i == 5) v = 4.0;
      else if (i == 6) v = 14.0;
      else if (i == 7) v = 6.0;
      else if (i == 8) v = 3.0;
      else if (i == 9) v = 11.0;
      else if (i == 10) v = 1.0;
      else if (i == 11) v = 9.0;
      else if (i == 12) v = 15.0;
      else if (i == 13) v = 7.0;
      else if (i == 14) v = 13.0;
      else v = 5.0;
      return (v + 0.5) / 16.0;
    }

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
      vec2 p = gl_FragCoord.xy;
      float distToPointer = distance(p, u_pointer);
      float light = (1.0 - smoothstep(u_radius * u_softness, u_radius, distToPointer)) * u_active;

      // keep text readable: the halo fades to u_keepFloor on top of each protected box and back to full strength u_keepSoft px away
      float keep = 1.0;
      for (int i = 0; i < 12; i++) {
        if (i >= u_keepCount) break;
        vec4 box = u_keep[i];
        vec2 gap = max(max(box.xy - p, vec2(0.0)), p - box.zw);
        keep = min(keep, mix(u_keepFloor, 1.0, smoothstep(0.0, u_keepSoft, length(gap))));
      }
      light *= keep;

      vec2 cell = floor(p / u_dotScale);
      vec2 local = fract(p / u_dotScale) - 0.5;
      float vignette = 1.0 - smoothstep(0.2, 1.0, distance(p / u_resolution, vec2(0.5)) * 1.35);
      float paper = hash(cell) * 0.08 + sin((cell.x + cell.y) * 0.32 + u_time * 0.45) * 0.025;
      float tone = clamp(light * u_intensity + vignette * 0.08 + paper, 0.0, 1.0);

      float threshold = bayer4(cell);
      float dotRadius = mix(0.08, 0.48, smoothstep(threshold - 0.18, threshold + 0.18, tone));
      float dot = 1.0 - smoothstep(dotRadius, dotRadius + 0.075, length(local));

      vec3 color = mix(u_background, u_ink, dot * (0.16 + light * 0.84));
      outColor = vec4(color, 1.0);
    }`,
  );

  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  gl.deleteShader(vertexShader);
  gl.deleteShader(fragmentShader);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }

  return program;
}

export interface DitherSpotlightProps {
  radius?: number;
  softness?: number;
  dotScale?: number;
  intensity?: number;
  followSpeed?: number;
  /** CSS selector of text that must stay readable: the halo fades out as the pointer comes close to any of it. */
  keepClear?: string;
  /** Distance in px from an element at which the fade starts. */
  keepClearDistance?: number;
  /** Strength the halo fades to on top of the text (0 to 1). */
  keepClearFloor?: number;
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactNode;
}

/**
 * A cursor-following WebGL spotlight rendered as ordered halftone dots.
 * Pointer tracking listens on the parent element, so the layer can sit behind
 * other content and still react.
 */
export function DitherSpotlight({
  radius = 220,
  softness = 0.25,
  dotScale = 5,
  intensity = 0.92,
  followSpeed = 0.14,
  keepClear,
  keepClearDistance = 80,
  keepClearFloor = 0.15,
  style,
  className,
  children,
}: DitherSpotlightProps) {
  const inkRgb = useCssRgb('--ink', '32, 32, 30');
  const backgroundRgb = useCssRgb('--bg', '243, 243, 243');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sizeRef = useRef({ w: 0, h: 0, dpr: 1 });
  const pointerRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const activeRef = useRef(0);
  const hasPointerRef = useRef(false);
  // null: not known yet. false: touch device or reduced motion, so one still frame and no pointer tracking.
  const live = useMotionAllowed();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const host = wrapper?.parentElement;
    if (!wrapper || !host || !live) return;

    const toLocal = (event: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      return { x: event.clientX - rect.left, y: rect.height - (event.clientY - rect.top) };
    };
    const onPointerMove = (event: PointerEvent) => {
      targetRef.current = toLocal(event);
      hasPointerRef.current = true;
    };
    const onPointerEnter = (event: PointerEvent) => {
      targetRef.current = toLocal(event);
      pointerRef.current = { ...targetRef.current };
      hasPointerRef.current = true;
    };
    const onPointerLeave = () => {
      hasPointerRef.current = false;
    };

    host.addEventListener('pointerenter', onPointerEnter);
    host.addEventListener('pointermove', onPointerMove);
    host.addEventListener('pointerleave', onPointerLeave);
    return () => {
      host.removeEventListener('pointerenter', onPointerEnter);
      host.removeEventListener('pointermove', onPointerMove);
      host.removeEventListener('pointerleave', onPointerLeave);
      hasPointerRef.current = false;
    };
  }, [live]);

  useEffect(() => {
    if (live === null || !canvasRef.current) return;
    const canvas: HTMLCanvasElement = canvasRef.current;
    const gl = canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'high-performance' });
    if (!gl) return;
    const context: WebGL2RenderingContext = gl;

    const program = createProgram(context);
    if (!program) return;

    const uniforms = {
      resolution: context.getUniformLocation(program, 'u_resolution'),
      pointer: context.getUniformLocation(program, 'u_pointer'),
      ink: context.getUniformLocation(program, 'u_ink'),
      background: context.getUniformLocation(program, 'u_background'),
      time: context.getUniformLocation(program, 'u_time'),
      radius: context.getUniformLocation(program, 'u_radius'),
      softness: context.getUniformLocation(program, 'u_softness'),
      dotScale: context.getUniformLocation(program, 'u_dotScale'),
      intensity: context.getUniformLocation(program, 'u_intensity'),
      active: context.getUniformLocation(program, 'u_active'),
      keep: context.getUniformLocation(program, 'u_keep'),
      keepCount: context.getUniformLocation(program, 'u_keepCount'),
      keepFloor: context.getUniformLocation(program, 'u_keepFloor'),
      keepSoft: context.getUniformLocation(program, 'u_keepSoft'),
    };

    const ink = parseRgb(inkRgb);
    const background = parseRgb(backgroundRgb);
    const still = !live;
    if (still) activeRef.current = 0;
    let rafId = 0;
    const start = performance.now();
    // text the halo must not drown: found once, measured on every frame while the pointer is over the hero
    const protectedNodes = keepClear ? Array.from(document.querySelectorAll(keepClear)) : [];

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = cappedDpr();
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));

      sizeRef.current = { w: rect.width, h: rect.height, dpr };
      canvas.width = width;
      canvas.height = height;
      context.viewport(0, 0, width, height);
    }

    function draw(now: number) {
      const { dpr } = sizeRef.current;
      pointerRef.current.x += (targetRef.current.x - pointerRef.current.x) * followSpeed;
      pointerRef.current.y += (targetRef.current.y - pointerRef.current.y) * followSpeed;

      const targetActive = hasPointerRef.current ? 1 : 0;
      activeRef.current = still ? 0 : activeRef.current + (targetActive - activeRef.current) * followSpeed;

      // boxes of the text to keep clear, in canvas pixels with the origin at the bottom left (like gl_FragCoord)
      const wrapperBox = canvas.getBoundingClientRect();
      const boxes = new Float32Array(48);
      let count = 0;
      for (const node of protectedNodes) {
        if (count === 12) break;
        const box = node.getBoundingClientRect();
        if (box.width === 0 && box.height === 0) continue;
        boxes.set([(box.left - wrapperBox.left) * dpr, (wrapperBox.bottom - box.bottom) * dpr, (box.right - wrapperBox.left) * dpr, (wrapperBox.bottom - box.top) * dpr], count * 4);
        count += 1;
      }

      context.useProgram(program);
      context.uniform2f(uniforms.resolution, canvas.width, canvas.height);
      context.uniform2f(uniforms.pointer, pointerRef.current.x * dpr, pointerRef.current.y * dpr);
      context.uniform3f(uniforms.ink, ink[0], ink[1], ink[2]);
      context.uniform3f(uniforms.background, background[0], background[1], background[2]);
      context.uniform1f(uniforms.time, still ? 0 : (now - start) / 1000);
      context.uniform1f(uniforms.radius, radius * dpr);
      context.uniform1f(uniforms.softness, Math.min(Math.max(softness, 0.01), 0.95));
      context.uniform1f(uniforms.dotScale, Math.max(2, dotScale * dpr));
      context.uniform1f(uniforms.intensity, intensity);
      context.uniform1f(uniforms.active, activeRef.current);
      context.uniform4fv(uniforms.keep, boxes);
      context.uniform1i(uniforms.keepCount, count);
      context.uniform1f(uniforms.keepFloor, keepClearFloor);
      context.uniform1f(uniforms.keepSoft, keepClearDistance * dpr);
      context.drawArrays(context.TRIANGLES, 0, 6);
    }

    let onScreen = true;
    const frame = (now: number) => {
      if (onScreen) draw(now);
      rafId = requestAnimationFrame(frame);
    };

    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw(performance.now());
    });
    resizeObserver.observe(canvas);
    const visibility = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
    });
    visibility.observe(canvas);

    resize();
    draw(start);
    if (!still) rafId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      visibility.disconnect();
      context.deleteProgram(program);
    };
  }, [backgroundRgb, dotScale, followSpeed, inkRgb, intensity, keepClear, keepClearDistance, keepClearFloor, live, radius, softness]);

  return (
    <div ref={wrapperRef} className={['dither', className].filter(Boolean).join(' ')} style={style}>
      <canvas ref={canvasRef} aria-hidden="true" className="dither-canvas" />
      {children && <div className="dither-children">{children}</div>}
    </div>
  );
}

export default DitherSpotlight;
