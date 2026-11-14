import { act, render } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import BackgroundParticles from "@/components/UI/BackgroundParticles";
import Particles from "@/components/UI/Particles";

const themeState = { resolvedTheme: "dark" as string | undefined };

vi.mock("next-themes", () => ({
  useTheme: () => themeState,
}));

function mockMatchMedia(reducedMotion: boolean) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches:
        query === "(prefers-reduced-motion: reduce)" ? reducedMotion : false,
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    })),
  });
}

type UniformRecord = Record<string, number | number[]>;

function createMockWebGL2Context() {
  const uniformLocations = new Map<string, { name: string }>();
  const uniformValues: UniformRecord = {};
  let programCount = 0;

  const glMock = {
    VERTEX_SHADER: 0x8b31,
    FRAGMENT_SHADER: 0x8b30,
    COMPILE_STATUS: 0x8b81,
    LINK_STATUS: 0x8b82,
    ACTIVE_UNIFORMS: 0x8b86,
    ARRAY_BUFFER: 0x8892,
    STATIC_DRAW: 0x88e4,
    DYNAMIC_DRAW: 0x88e8,
    FLOAT: 0x1406,
    COLOR_BUFFER_BIT: 0x4000,
    BLEND: 0x0be2,
    ONE: 1,
    ONE_MINUS_SRC_ALPHA: 0x0303,
    TRIANGLE_STRIP: 0x0005,

    createShader: vi.fn(() => ({})),
    shaderSource: vi.fn(),
    compileShader: vi.fn(),
    getShaderParameter: vi.fn(() => true),
    deleteShader: vi.fn(),

    createProgram: vi.fn(() => ({ id: ++programCount })),
    attachShader: vi.fn(),
    linkProgram: vi.fn(),
    getProgramParameter: vi.fn((_program: unknown, pname: number) =>
      pname === 0x8b86 ? 4 : true,
    ),
    getActiveUniform: vi.fn((_program: unknown, index: number) => {
      const names = ["uScroll", "uGlow", "uSize", "uSoft"];
      return { name: names[index] ?? "uScroll" };
    }),
    getUniformLocation: vi.fn((_program: unknown, name: string) => {
      const loc = { name };
      uniformLocations.set(name, loc);
      return loc;
    }),
    deleteProgram: vi.fn(),

    createBuffer: vi.fn(() => ({})),
    bindBuffer: vi.fn(),
    bufferData: vi.fn(),
    bufferSubData: vi.fn(),
    deleteBuffer: vi.fn(),

    createVertexArray: vi.fn(() => ({})),
    bindVertexArray: vi.fn(),
    deleteVertexArray: vi.fn(),
    enableVertexAttribArray: vi.fn(),
    vertexAttribPointer: vi.fn(),
    vertexAttribDivisor: vi.fn(),

    viewport: vi.fn(),
    clearColor: vi.fn(),
    clear: vi.fn(),
    enable: vi.fn(),
    blendFunc: vi.fn(),
    useProgram: vi.fn(),

    uniform1f: vi.fn((loc: { name: string } | null, value: number) => {
      if (loc) uniformValues[loc.name] = value;
    }),
    uniform1i: vi.fn((loc: { name: string } | null, value: number) => {
      if (loc) uniformValues[loc.name] = value;
    }),
    uniform2f: vi.fn(),
    uniform3f: vi.fn(),
    uniform4f: vi.fn(),
    uniform4fv: vi.fn(),
    uniformMatrix3fv: vi.fn(),

    drawArraysInstanced: vi.fn(),
    getExtension: vi.fn(() => ({ loseContext: vi.fn() })),
  };

  return {
    gl: glMock as unknown as WebGL2RenderingContext,
    glMock,
    uniformValues,
  };
}

describe("Particles", () => {
  beforeEach(() => {
    themeState.resolvedTheme = "dark";
    mockMatchMedia(false);
    Object.defineProperty(window, "scrollY", {
      writable: true,
      configurable: true,
      value: 0,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders Tailwind-only markup and exits cleanly when WebGL2 is unavailable", () => {
    const getContextSpy = vi
      .spyOn(HTMLCanvasElement.prototype, "getContext")
      .mockReturnValue(null);

    const { container } = render(<Particles />);
    const wrapper = container.firstElementChild as HTMLDivElement;
    const canvas = wrapper.querySelector("canvas");

    expect(wrapper.className).toContain("relative");
    expect(wrapper.className).toContain("w-full h-full overflow-hidden");
    expect(canvas?.getAttribute("aria-hidden")).toBe("true");
    expect(canvas?.className).toBe("absolute inset-0 block w-full h-full");
    expect(getContextSpy).toHaveBeenCalledWith("webgl2", expect.any(Object));
  });

  it("avoids conflicting relative positioning when fixed className is supplied", () => {
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockReturnValue(null);

    const { container } = render(
      <Particles className="fixed inset-0 z-0 pointer-events-none" />,
    );
    const wrapper = container.firstElementChild as HTMLDivElement;

    expect(wrapper.className).not.toContain("relative");
    expect(wrapper.className).toContain(
      "fixed inset-0 z-0 pointer-events-none",
    );
  });

  it("updates scroll parallax offset when scrolling down and up, and cleans up on unmount", () => {
    const { gl, glMock, uniformValues } = createMockWebGL2Context();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      (contextId: string) =>
        contextId === "webgl2"
          ? (gl as unknown as RenderingContext)
          : (null as unknown as RenderingContext),
    );

    const rafCallbacks: FrameRequestCallback[] = [];
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });
    const cancelSpy = vi
      .spyOn(window, "cancelAnimationFrame")
      .mockImplementation(() => {});

    const { container, unmount } = render(
      <Particles cameraDistance={30} scrollParallax={0.5} />,
    );
    const wrapper = container.firstElementChild as HTMLDivElement;
    Object.defineProperty(wrapper, "clientWidth", { value: 1200 });
    Object.defineProperty(wrapper, "clientHeight", { value: 800 });

    act(() => {
      rafCallbacks[0]?.(16);
    });
    expect(uniformValues.uScroll).toBe(0);

    Object.defineProperty(window, "scrollY", { value: 800, writable: true });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
      rafCallbacks[1]?.(500);
    });

    expect(Number(uniformValues.uScroll)).toBeGreaterThan(0);
    const scrolledDownValue = Number(uniformValues.uScroll);

    Object.defineProperty(window, "scrollY", { value: 0, writable: true });
    act(() => {
      window.dispatchEvent(new Event("scroll"));
      rafCallbacks[2]?.(900);
    });

    expect(Number(uniformValues.uScroll)).toBeLessThan(scrolledDownValue);
    expect(glMock.drawArraysInstanced).toHaveBeenCalled();

    unmount();
    expect(cancelSpy).toHaveBeenCalled();
    expect(glMock.deleteProgram).toHaveBeenCalledTimes(2);
    expect(glMock.deleteBuffer).toHaveBeenCalledTimes(5);
    expect(glMock.deleteVertexArray).toHaveBeenCalledTimes(2);
  });

  it("disables scroll parallax when prefers-reduced-motion is enabled", () => {
    mockMatchMedia(true);
    const { gl, uniformValues } = createMockWebGL2Context();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      (contextId: string) =>
        contextId === "webgl2"
          ? (gl as unknown as RenderingContext)
          : (null as unknown as RenderingContext),
    );

    const rafCallbacks: FrameRequestCallback[] = [];
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });

    Object.defineProperty(window, "scrollY", { value: 1200, writable: true });
    render(<Particles cameraDistance={30} scrollParallax={0.5} />);

    act(() => {
      rafCallbacks[0]?.(16);
    });

    expect(uniformValues.uScroll).toBe(0);
  });

  it("switches Particles lightMode based on active theme in BackgroundParticles", () => {
    const { gl, uniformValues } = createMockWebGL2Context();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      (contextId: string) =>
        contextId === "webgl2"
          ? (gl as unknown as RenderingContext)
          : (null as unknown as RenderingContext),
    );
    const rafCallbacks: FrameRequestCallback[] = [];
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });

    themeState.resolvedTheme = "dark";
    const { container, rerender } = render(<BackgroundParticles />);
    const wrapper = container.firstElementChild as HTMLDivElement;

    expect(wrapper.className).toContain(
      "fixed inset-0 z-0 pointer-events-none",
    );
    expect(uniformValues.uGlow).toBeCloseTo(0.2);
    expect(uniformValues.uSize).toBe(55);
    expect(uniformValues.uSoft).toBeCloseTo(0.2);

    themeState.resolvedTheme = "light";
    rerender(<BackgroundParticles />);
    act(() => {
      rafCallbacks.at(-1)?.(32);
    });

    expect(uniformValues.uGlow).toBeCloseTo(0.105);
    expect(uniformValues.uSize).toBe(95);
    expect(uniformValues.uSoft).toBe(0);
  });

  it("renders synchronously on prop updates while paused", () => {
    const { gl, uniformValues } = createMockWebGL2Context();
    vi.spyOn(HTMLCanvasElement.prototype, "getContext").mockImplementation(
      (contextId: string) =>
        contextId === "webgl2"
          ? (gl as unknown as RenderingContext)
          : (null as unknown as RenderingContext),
    );
    const rafCallbacks: FrameRequestCallback[] = [];
    vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
      rafCallbacks.push(cb);
      return rafCallbacks.length;
    });

    const { rerender } = render(
      <Particles glow={0.4} paused lightMode={false} />,
    );
    act(() => {
      rafCallbacks.at(-1)?.(16);
    });
    expect(uniformValues.uGlow).toBeCloseTo(0.4);

    rerender(<Particles glow={0.4} paused lightMode />);
    expect(uniformValues.uGlow).toBeCloseTo(0.12);
  });
});
