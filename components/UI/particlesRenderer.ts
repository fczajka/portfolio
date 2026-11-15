import {
  BURST_SECONDS,
  FOCAL,
  LINE_FRAGMENT,
  LINE_VERTEX,
  MAX_BURSTS,
  MAX_LINES,
  MAX_LINKED,
  PARTICLE_FRAGMENT,
  PARTICLE_VERTEX,
  buildConnectionLines,
  buildParticleCloudData,
  computeRotationMatrix,
  createColorParser,
  easeOut,
  linkProgram,
  type ParticleBurst,
  type ParticleCloudState,
  type ParticleSettings,
  type PointerState,
  type ScreenProjectionBuffers,
  type SimulationState,
  type ViewMetrics,
} from "./particlesWebGL";

export type ParticleRenderer = {
  render: (params: {
    canvasWidth: number;
    canvasHeight: number;
    settings: ParticleSettings;
    state: SimulationState;
    view: ViewMetrics;
    pointer: PointerState;
    bursts: ParticleBurst[];
    reduceMotion: boolean;
  }) => void;
  dispose: () => void;
};

function attachInstancedAttribute(
  gl: WebGL2RenderingContext,
  buffer: WebGLBuffer | null,
  location: number,
  width: number,
) {
  if (!buffer) return;
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(location);
  gl.vertexAttribPointer(location, width, gl.FLOAT, false, 0, 0);
  gl.vertexAttribDivisor(location, 1);
}

/** Allocates WebGL2 shader programs, VAOs, and instanced buffers for the particle field. */
export function createParticleRenderer(
  gl: WebGL2RenderingContext,
): ParticleRenderer | null {
  const dots = linkProgram(gl, PARTICLE_VERTEX, PARTICLE_FRAGMENT);
  const lines = linkProgram(gl, LINE_VERTEX, LINE_FRAGMENT);
  if (!dots || !lines) {
    if (dots) gl.deleteProgram(dots.program);
    if (lines) gl.deleteProgram(lines.program);
    return null;
  }

  const corners = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, corners);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  );

  const positionBuffer = gl.createBuffer();
  const randomBuffer = gl.createBuffer();
  const colorBuffer = gl.createBuffer();
  const dotVao = gl.createVertexArray();
  gl.bindVertexArray(dotVao);
  gl.bindBuffer(gl.ARRAY_BUFFER, corners);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  attachInstancedAttribute(gl, positionBuffer, 1, 3);
  attachInstancedAttribute(gl, randomBuffer, 2, 4);
  attachInstancedAttribute(gl, colorBuffer, 3, 3);

  const lineBuffer = gl.createBuffer();
  const lineData = new Float32Array(MAX_LINES * 8);
  const lineVao = gl.createVertexArray();
  gl.bindVertexArray(lineVao);
  gl.bindBuffer(gl.ARRAY_BUFFER, corners);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, lineData.byteLength, gl.DYNAMIC_DRAW);
  gl.enableVertexAttribArray(1);
  gl.vertexAttribPointer(1, 4, gl.FLOAT, false, 32, 0);
  gl.vertexAttribDivisor(1, 1);
  gl.enableVertexAttribArray(2);
  gl.vertexAttribPointer(2, 4, gl.FLOAT, false, 32, 16);
  gl.vertexAttribDivisor(2, 1);
  gl.bindVertexArray(null);

  const parseColor = createColorParser();
  const packedBursts = new Float32Array(MAX_BURSTS * 4);
  const cloud: ParticleCloudState = {
    key: "",
    count: 0,
    positions: new Float32Array(0),
    randoms: new Float32Array(0),
    colors: new Float32Array(0),
  };
  const screen: ScreenProjectionBuffers = {
    x: new Float32Array(0),
    y: new Float32Array(0),
    ahead: new Float32Array(0),
    alpha: new Float32Array(0),
  };

  const syncCloudBuffers = (s: ParticleSettings) => {
    const key = `${s.count}|${s.variation}|${s.colors.join(",")}|${
      s.lightMode ? 1 : 0
    }`;
    if (key === cloud.key) return;
    cloud.key = key;
    const { positions, randoms, tints } = buildParticleCloudData(s, parseColor);
    cloud.count = s.count;
    cloud.positions = positions;
    cloud.randoms = randoms;
    cloud.colors = tints;
    const linked = Math.min(s.count, MAX_LINKED);
    screen.x = new Float32Array(linked);
    screen.y = new Float32Array(linked);
    screen.ahead = new Float32Array(linked);
    screen.alpha = new Float32Array(linked);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, randomBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, randoms, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, tints, gl.STATIC_DRAW);
  };

  const render: ParticleRenderer["render"] = ({
    canvasWidth,
    canvasHeight,
    settings: s,
    state,
    view,
    pointer,
    bursts,
    reduceMotion,
  }) => {
    syncCloudBuffers(s);
    const matrix = computeRotationMatrix(s, state.clock, state.spin);
    const offset: [number, number, number] = [
      state.offsetX,
      state.offsetY,
      -(1 - easeOut(state.reveal)) * 70,
    ];
    const [ox, oy, oz] = offset;
    const scrollOffset =
      reduceMotion || s.scrollParallax <= 0
        ? 0
        : (state.scrollY / Math.max(view.height, 1)) *
          ((s.camera / FOCAL) * 2) *
          s.scrollParallax;

    gl.viewport(0, 0, canvasWidth, canvasHeight);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    if (s.connections) {
      const lineCount = buildConnectionLines({
        settings: s,
        matrix,
        offset,
        scrollOffset,
        cloud,
        screen,
        view,
        pointer,
        state,
        bursts,
        lineData,
      });
      if (lineCount) {
        gl.useProgram(lines.program);
        gl.bindVertexArray(lineVao);
        gl.bindBuffer(gl.ARRAY_BUFFER, lineBuffer);
        gl.bufferSubData(
          gl.ARRAY_BUFFER,
          0,
          lineData.subarray(0, lineCount * 8),
        );
        gl.uniform2f(lines.uniforms.uView, view.width, view.height);
        gl.uniform1f(lines.uniforms.uRatio, view.ratio);
        gl.uniform1f(lines.uniforms.uWidth, 1);
        gl.uniform1f(lines.uniforms.uOpacity, s.opacity);
        gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, lineCount);
      }
    }

    const u = dots.uniforms;
    let burstCount = 0;
    for (let i = bursts.length - 1; i >= 0 && burstCount < MAX_BURSTS; i--) {
      packedBursts.set(
        [bursts[i].x, bursts[i].y, bursts[i].age / BURST_SECONDS, 1],
        burstCount * 4,
      );
      burstCount++;
    }

    gl.useProgram(dots.program);
    gl.bindVertexArray(dotVao);
    gl.uniformMatrix3fv(u.uRotation, false, matrix);
    gl.uniform3f(u.uOffset, ox, oy, oz);
    gl.uniform1f(u.uSpread, s.spread);
    gl.uniform1f(u.uTime, state.clock);
    gl.uniform1f(u.uCamera, s.camera);
    gl.uniform1f(u.uAspect, view.width / view.height);
    gl.uniform2f(u.uView, view.width, view.height);
    gl.uniform1f(u.uRatio, view.ratio);
    gl.uniform1f(u.uSize, s.size);
    gl.uniform1f(u.uRandomness, s.randomness);
    gl.uniform1f(u.uBlur, s.depthOfField * 14);
    gl.uniform1f(u.uFocus, s.camera + 14);
    gl.uniform1f(u.uGlow, s.lightMode ? s.glow * 0.3 : s.glow);
    gl.uniform1f(u.uTwinkle, s.twinkle);
    gl.uniform1i(u.uShape, s.shape);
    gl.uniform1i(u.uDrift, s.drift);
    gl.uniform1f(u.uTravel, state.travel);
    gl.uniform1f(u.uScroll, scrollOffset);
    gl.uniform4f(
      u.uPointer,
      pointer.sx,
      pointer.sy,
      pointer.active,
      s.hoverRadius,
    );
    gl.uniform1i(u.uEffect, s.hoverEffect);
    gl.uniform1f(u.uStrength, s.hoverFactor);
    gl.uniform4fv(u.uBursts, packedBursts);
    gl.uniform1i(u.uBurstCount, burstCount);
    gl.uniform1f(u.uReveal, state.reveal);
    gl.uniform1f(u.uSoft, s.soft ? 0.2 : 0);
    gl.uniform1f(u.uShimmer, s.lightMode ? 0 : 1);
    gl.uniform1f(u.uOpacity, s.opacity);
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, cloud.count);
    gl.bindVertexArray(null);
  };

  const dispose = () => {
    gl.deleteProgram(dots.program);
    gl.deleteProgram(lines.program);
    [corners, positionBuffer, randomBuffer, colorBuffer, lineBuffer].forEach(
      (buffer) => {
        if (buffer) gl.deleteBuffer(buffer);
      },
    );
    if (dotVao) gl.deleteVertexArray(dotVao);
    if (lineVao) gl.deleteVertexArray(lineVao);
  };

  return { render, dispose };
}
