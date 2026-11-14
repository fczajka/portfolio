"use client";

import { useEffect, useId, useRef, type CSSProperties } from "react";

type HeroPortraitProps = {
  isVisible: boolean;
};

type CssVarStyle = CSSProperties & Record<`--${string}`, string>;

const cssVars = (vars: Record<`--${string}`, string>): CssVarStyle => vars;

const EYE_LEFT_PATH =
  "M 191.5 216 C 191.5 207.5, 198.5 204.5, 207 204.5 C 215.5 204.5, 222.5 208, 222.5 216 C 222.5 224, 215.5 227.5, 207 227.5 C 198.5 227.5, 191.5 224, 191.5 216 Z";

const EYE_RIGHT_PATH =
  "M 279.5 216 C 279.5 207.5, 286.5 204.5, 295 204.5 C 303.5 204.5, 310.5 208, 310.5 216 C 310.5 224, 303.5 227.5, 295 227.5 C 286.5 227.5, 279.5 224, 279.5 216 Z";

const HAIR_CROWN_PATH =
  "M 167 118 L 152 118 C 150 100, 158 88, 174 86 L 165 81 C 172 67, 185 59, 197 56 L 189 50 C 204 37, 222 32, 238 32 L 234 39 C 244 28, 256 25, 264 33 L 274 25 C 300 31, 326 48, 338 78 C 344 93, 345 106, 342 116 L 334 118 C 316 98, 286 92, 260 100 C 248 104, 236 112, 224 123 L 234 102 C 210 101, 186 106, 167 118 Z";

const LEFT_SIDEBURN_FILL_PATH =
  "M 163 196 C 155 170, 152 148, 153 132 L 166 132 C 164 152, 163 174, 163 196 Z";

const LEFT_SIDEBURN_STROKE_PATH =
  "M 166 132 L 153 132 C 152 148, 155 170, 162 195";

const RIGHT_SIDEBURN_FILL_PATH =
  "M 338 194 C 345 168, 348 146, 347 130 L 334 130 C 336 150, 337 172, 338 194 Z";

const RIGHT_SIDEBURN_STROKE_PATH =
  "M 334 130 L 347 130 C 348 146, 345 168, 339 193";

const SHIRT_FILL_PATH =
  "M 88 456 C 95 424, 105 404, 130 398 C 156 391, 179 388, 199 382 C 219 406, 236 422, 251 422 C 266 422, 285 406, 305 383 C 325 389, 350 392, 374 398 C 398 404, 409 424, 416 456 C 394 463, 370 454, 344 460 C 316 466, 290 453, 256 460 C 222 466, 196 454, 166 460 C 136 466, 110 454, 88 456 Z";

const SHIRT_OUTLINE_PATH =
  "M 88 456 C 95 424, 105 404, 130 398 C 156 391, 179 388, 199 382 C 219 406, 236 422, 251 422 C 266 422, 285 406, 305 383 C 325 389, 350 392, 374 398 C 398 404, 409 424, 416 456";

export default function HeroPortrait({ isVisible }: HeroPortraitProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rawId = useId().replace(/:/g, "");
  const leftEyeClipId = `hero-left-eye-${rawId}`;
  const rightEyeClipId = `hero-right-eye-${rawId}`;
  const auraGradientId = `hero-aura-${rawId}`;

  useEffect(() => {
    const element = containerRef.current;
    if (!element || !isVisible) return;

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");

    const resetOffsets = () => {
      element.style.setProperty("--px", "0");
      element.style.setProperty("--py", "0");
    };

    if (motionQuery.matches || !pointerQuery.matches) {
      resetOffsets();
      return;
    }

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let rafId: number | null = null;
    let isDisposed = false;

    const tick = () => {
      if (isDisposed) return;

      currentX += (targetX - currentX) * 0.1;
      currentY += (targetY - currentY) * 0.1;

      if (
        Math.abs(targetX - currentX) < 0.001 &&
        Math.abs(targetY - currentY) < 0.001
      ) {
        currentX = targetX;
        currentY = targetY;
        element.style.setProperty("--px", currentX.toFixed(4));
        element.style.setProperty("--py", currentY.toFixed(4));
        rafId = null;
        return;
      }

      element.style.setProperty("--px", currentX.toFixed(4));
      element.style.setProperty("--py", currentY.toFixed(4));
      rafId = window.requestAnimationFrame(tick);
    };

    const startAnimation = () => {
      if (rafId === null && !isDisposed) {
        rafId = window.requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" && event.pointerType !== "pen") {
        return;
      }

      const rect = element.getBoundingClientRect();
      if (
        rect.width === 0 ||
        rect.bottom < 0 ||
        rect.top > window.innerHeight
      ) {
        return;
      }

      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.43;
      const dx = event.clientX - centerX;
      const dy = event.clientY - centerY;
      const distance = Math.hypot(dx, dy);

      if (distance < 0.5) {
        targetX = 0;
        targetY = 0;
      } else {
        const radius = Math.max(rect.width, 320) * 0.85;
        const strength = (distance / (distance + radius)) * 1.15;
        targetX = Math.max(-1, Math.min(1, (dx / distance) * strength));
        targetY = Math.max(-1, Math.min(1, (dy / distance) * strength));
      }

      startAnimation();
    };

    const handlePointerLeave = () => {
      targetX = 0;
      targetY = 0;
      startAnimation();
    };

    const handleMotionChange = () => {
      if (motionQuery.matches) {
        if (rafId !== null) {
          window.cancelAnimationFrame(rafId);
          rafId = null;
        }
        targetX = 0;
        targetY = 0;
        currentX = 0;
        currentY = 0;
        resetOffsets();
      }
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("mouseleave", handlePointerLeave);
    motionQuery.addEventListener("change", handleMotionChange);

    return () => {
      isDisposed = true;
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("mouseleave", handlePointerLeave);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [isVisible]);

  const strokeClass = isVisible
    ? "hero-stroke hero-stroke-active"
    : "hero-stroke";
  const fillClass = isVisible ? "hero-fill hero-fill-active" : "hero-fill";
  const floatClass = isVisible ? "hero-float-active" : "";
  const auraClass = isVisible ? "hero-aura-active" : "";
  const blinkOpenClass = isVisible
    ? "hero-blink-open hero-blink-open-active"
    : "hero-blink-open";
  const blinkLidClass = isVisible
    ? "hero-blink-lid hero-blink-lid-active"
    : "hero-blink-lid";

  const inkStroke =
    "fill-none stroke-zinc-900 dark:stroke-zinc-100 [stroke-linecap:round] [stroke-linejoin:round]";
  const skinFill = "fill-zinc-50 dark:fill-dark-primary-bg";
  const accentFill = "fill-primary-100 dark:fill-primary-200";

  return (
    <div
      ref={containerRef}
      className="group relative w-full max-w-[19rem] sm:max-w-[23rem] md:max-w-[27rem] lg:max-w-[34rem] xl:max-w-[37rem] mx-auto flex items-center justify-center select-none"
    >
      <svg
        viewBox="64 12 374 466"
        role="img"
        aria-label="Animated line-art portrait of Franciszek Czajka"
        className="w-full h-auto max-h-[44vh] sm:max-h-[48vh] lg:max-h-[78vh] overflow-visible"
      >
        <defs>
          <radialGradient id={auraGradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.1" />
            <stop offset="55%" stopColor="#bfdbfe" stopOpacity="0.04" />
            <stop offset="100%" stopColor="#bfdbfe" stopOpacity="0" />
          </radialGradient>
          <clipPath id={leftEyeClipId}>
            <path d={EYE_LEFT_PATH} />
          </clipPath>
          <clipPath id={rightEyeClipId}>
            <path d={EYE_RIGHT_PATH} />
          </clipPath>
        </defs>

        {/* Soft dimmed aura behind the portrait */}
        <g
          className={`${fillClass} ${auraClass}`}
          style={cssVars({ "--fill-delay": "0.15s" })}
          aria-hidden="true"
        >
          <circle
            cx="251"
            cy="245"
            r="184"
            fill={`url(#${auraGradientId})`}
            className="transition-opacity duration-500 group-hover:opacity-100 opacity-80 motion-reduce:transition-none"
          />
        </g>

        {/* Main floating portrait */}
        <g className={floatClass}>
          {/* Neck and T-shirt shoulders */}
          <g className="hero-layer-torso">
            <path
              d="M 208 336 L 294 336 C 292 359, 296 373, 306 383 C 286 406, 267 422, 251 422 C 236 422, 218 406, 198 382 C 207 372, 211 359, 208 336 Z"
              className={`${skinFill} ${fillClass}`}
              style={cssVars({ "--fill-delay": "0.45s" })}
            />
            <path
              d={SHIRT_FILL_PATH}
              className={`${accentFill} ${fillClass}`}
              style={cssVars({ "--fill-delay": "0.7s" })}
            />
            <path
              d={SHIRT_OUTLINE_PATH}
              pathLength={1}
              strokeWidth="6.8"
              className={`${inkStroke} ${strokeClass}`}
              style={cssVars({
                "--draw-delay": "0.22s",
                "--draw-duration": "0.7s",
              })}
            />
            <path
              d="M 208 338 C 211 359, 209 372, 199 382"
              pathLength={1}
              strokeWidth="6.5"
              className={`${inkStroke} ${strokeClass}`}
              style={cssVars({
                "--draw-delay": "0.38s",
                "--draw-duration": "0.38s",
              })}
            />
            <path
              d="M 294 338 C 291 359, 293 372, 305 383"
              pathLength={1}
              strokeWidth="6.5"
              className={`${inkStroke} ${strokeClass}`}
              style={cssVars({
                "--draw-delay": "0.38s",
                "--draw-duration": "0.38s",
              })}
            />
            <path
              d="M 239 384 Q 251 391 264 384"
              pathLength={1}
              strokeWidth="5.5"
              className={`${inkStroke} ${strokeClass}`}
              style={cssVars({
                "--draw-delay": "0.55s",
                "--draw-duration": "0.3s",
              })}
            />
          </g>

          {/* Head, ears, hair, and facial features */}
          <g className="hero-layer-head">
            {/* Ears */}
            <path
              d="M 163 206 C 151 196, 140 194, 140 206 C 140 220, 148 238, 154 252 C 157 262, 161 268, 166 271 Z"
              className={`${skinFill} ${fillClass}`}
              style={cssVars({ "--fill-delay": "0.45s" })}
            />
            <path
              d="M 163 206 C 151 196, 140 194, 140 206 C 140 220, 148 238, 154 252 C 157 262, 161 268, 166 271"
              pathLength={1}
              strokeWidth="6.5"
              className={`${inkStroke} ${strokeClass}`}
              style={cssVars({
                "--draw-delay": "0.28s",
                "--draw-duration": "0.45s",
              })}
            />
            <path
              d="M 149 214 C 155 222, 156 233, 153 243"
              pathLength={1}
              strokeWidth="5"
              className={`${inkStroke} ${strokeClass}`}
              style={cssVars({
                "--draw-delay": "0.42s",
                "--draw-duration": "0.28s",
              })}
            />

            <path
              d="M 337 206 C 349 196, 360 194, 360 206 C 360 220, 352 238, 346 252 C 343 262, 339 268, 334 271 Z"
              className={`${skinFill} ${fillClass}`}
              style={cssVars({ "--fill-delay": "0.45s" })}
            />
            <path
              d="M 337 206 C 349 196, 360 194, 360 206 C 360 220, 352 238, 346 252 C 343 262, 339 268, 334 271"
              pathLength={1}
              strokeWidth="6.5"
              className={`${inkStroke} ${strokeClass}`}
              style={cssVars({
                "--draw-delay": "0.28s",
                "--draw-duration": "0.45s",
              })}
            />
            <path
              d="M 351 214 C 345 222, 344 233, 347 243"
              pathLength={1}
              strokeWidth="5"
              className={`${inkStroke} ${strokeClass}`}
              style={cssVars({
                "--draw-delay": "0.42s",
                "--draw-duration": "0.28s",
              })}
            />

            {/* Face fill & jaw contour */}
            <path
              d="M 166 132 C 161 178, 160 224, 164 268 C 167 296, 178 320, 202 340 C 222 355, 238 358, 251 358 C 264 358, 280 355, 300 340 C 324 320, 335 296, 338 268 C 342 224, 340 178, 334 130 C 318 72, 182 72, 166 132 Z"
              className={`${skinFill} ${fillClass}`}
              style={cssVars({ "--fill-delay": "0.42s" })}
            />
            <path
              d="M 166 132 C 161 178, 160 224, 164 268 C 167 296, 178 320, 202 340 C 222 355, 238 358, 251 358 C 264 358, 280 355, 300 340 C 324 320, 335 296, 338 268 C 342 224, 340 178, 334 130"
              pathLength={1}
              strokeWidth="6.8"
              className={`${inkStroke} ${strokeClass}`}
              style={cssVars({
                "--draw-delay": "0.12s",
                "--draw-duration": "0.72s",
              })}
            />

            {/* Hair */}
            <path
              d={LEFT_SIDEBURN_FILL_PATH}
              className={`${accentFill} ${fillClass}`}
              style={cssVars({ "--fill-delay": "0.68s" })}
            />
            <path
              d={LEFT_SIDEBURN_STROKE_PATH}
              pathLength={1}
              strokeWidth="6.2"
              className={`${inkStroke} ${strokeClass}`}
              style={cssVars({
                "--draw-delay": "0.32s",
                "--draw-duration": "0.42s",
              })}
            />
            <path
              d={RIGHT_SIDEBURN_FILL_PATH}
              className={`${accentFill} ${fillClass}`}
              style={cssVars({ "--fill-delay": "0.68s" })}
            />
            <path
              d={RIGHT_SIDEBURN_STROKE_PATH}
              pathLength={1}
              strokeWidth="6.2"
              className={`${inkStroke} ${strokeClass}`}
              style={cssVars({
                "--draw-delay": "0.32s",
                "--draw-duration": "0.42s",
              })}
            />
            <path
              d={HAIR_CROWN_PATH}
              className={`${accentFill} ${fillClass}`}
              style={cssVars({ "--fill-delay": "0.66s" })}
            />
            <path
              d={HAIR_CROWN_PATH}
              pathLength={1}
              strokeWidth="6.8"
              className={`${inkStroke} ${strokeClass}`}
              style={cssVars({
                "--draw-delay": "0.26s",
                "--draw-duration": "0.82s",
              })}
            />

            {/* Facial features layer (extra depth parallax) */}
            <g className="hero-layer-features">
              {/* Eyebrows */}
              <g className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none">
                <path
                  d="M 173 182 C 190 170, 214 169, 233 177"
                  pathLength={1}
                  strokeWidth="11.5"
                  className={`${inkStroke} ${strokeClass}`}
                  style={cssVars({
                    "--draw-delay": "0.5s",
                    "--draw-duration": "0.36s",
                  })}
                />
                <path
                  d="M 270 177 C 289 169, 313 170, 330 182"
                  pathLength={1}
                  strokeWidth="11.5"
                  className={`${inkStroke} ${strokeClass}`}
                  style={cssVars({
                    "--draw-delay": "0.52s",
                    "--draw-duration": "0.36s",
                  })}
                />
              </g>

              {/* Left Eye */}
              <g
                className={blinkOpenClass}
                style={{ transformOrigin: "207px 216px" }}
              >
                <path
                  d={EYE_LEFT_PATH}
                  className={`${skinFill} ${fillClass}`}
                  style={cssVars({ "--fill-delay": "0.62s" })}
                />
                <g clipPath={`url(#${leftEyeClipId})`}>
                  <g className="hero-pupil">
                    <circle
                      cx="207"
                      cy="216"
                      r="5.8"
                      className={`fill-zinc-900 dark:fill-zinc-100 ${fillClass}`}
                      style={cssVars({ "--fill-delay": "0.72s" })}
                    />
                    <circle
                      cx="205"
                      cy="214"
                      r="1.7"
                      className={`${skinFill} ${fillClass}`}
                      style={cssVars({ "--fill-delay": "0.74s" })}
                    />
                  </g>
                </g>
                <path
                  d={EYE_LEFT_PATH}
                  pathLength={1}
                  strokeWidth="6.2"
                  className={`${inkStroke} ${strokeClass}`}
                  style={cssVars({
                    "--draw-delay": "0.54s",
                    "--draw-duration": "0.38s",
                  })}
                />
              </g>
              <path
                d="M 191 217 Q 207 223 223 217"
                strokeWidth="6.2"
                className={`${inkStroke} ${blinkLidClass}`}
              />

              {/* Right Eye */}
              <g
                className={blinkOpenClass}
                style={{ transformOrigin: "295px 216px" }}
              >
                <path
                  d={EYE_RIGHT_PATH}
                  className={`${skinFill} ${fillClass}`}
                  style={cssVars({ "--fill-delay": "0.62s" })}
                />
                <g clipPath={`url(#${rightEyeClipId})`}>
                  <g className="hero-pupil">
                    <circle
                      cx="295"
                      cy="216"
                      r="5.8"
                      className={`fill-zinc-900 dark:fill-zinc-100 ${fillClass}`}
                      style={cssVars({ "--fill-delay": "0.72s" })}
                    />
                    <circle
                      cx="293"
                      cy="214"
                      r="1.7"
                      className={`${skinFill} ${fillClass}`}
                      style={cssVars({ "--fill-delay": "0.74s" })}
                    />
                  </g>
                </g>
                <path
                  d={EYE_RIGHT_PATH}
                  pathLength={1}
                  strokeWidth="6.2"
                  className={`${inkStroke} ${strokeClass}`}
                  style={cssVars({
                    "--draw-delay": "0.56s",
                    "--draw-duration": "0.38s",
                  })}
                />
              </g>
              <path
                d="M 279 217 Q 295 223 311 217"
                strokeWidth="6.2"
                className={`${inkStroke} ${blinkLidClass}`}
              />

              {/* Nose */}
              <path
                d="M 264 218 C 266 236, 272 248, 277 257 C 281 264, 275 273, 261 274 C 248 275, 236 273, 231 266"
                pathLength={1}
                strokeWidth="6.4"
                className={`${inkStroke} ${strokeClass}`}
                style={cssVars({
                  "--draw-delay": "0.58s",
                  "--draw-duration": "0.42s",
                })}
              />

              {/* Warm smile */}
              <g className="transition-transform duration-300 ease-out origin-[251px_310px] group-hover:scale-x-105 group-hover:-translate-y-px motion-reduce:transition-none">
                <path
                  d="M 218 305 Q 251 319 284 305"
                  pathLength={1}
                  strokeWidth="6.5"
                  className={`${inkStroke} ${strokeClass}`}
                  style={cssVars({
                    "--draw-delay": "0.64s",
                    "--draw-duration": "0.38s",
                  })}
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
}
