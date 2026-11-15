"use client";

import { useId, useRef } from "react";
import { usePortraitParallax } from "@/hooks/usePortraitParallax";
import PortraitFeatures from "./portrait/PortraitFeatures";
import PortraitHeadBase from "./portrait/PortraitHeadBase";
import PortraitTorso from "./portrait/PortraitTorso";
import {
  EYE_LEFT_PATH,
  EYE_RIGHT_PATH,
  cssVars,
  type PortraitClasses,
} from "./portrait/constants";

type HeroPortraitProps = {
  isVisible: boolean;
};

/** Interactive animated line-art portrait with layered pointer parallax and blinking. */
export default function HeroPortrait({ isVisible }: HeroPortraitProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rawId = useId().replace(/:/g, "");
  const leftEyeClipId = `hero-left-eye-${rawId}`;
  const rightEyeClipId = `hero-right-eye-${rawId}`;
  const auraGradientId = `hero-aura-${rawId}`;

  usePortraitParallax(containerRef, isVisible);

  const classes: PortraitClasses = {
    strokeClass: isVisible ? "hero-stroke hero-stroke-active" : "hero-stroke",
    fillClass: isVisible ? "hero-fill hero-fill-active" : "hero-fill",
    blinkOpenClass: isVisible
      ? "hero-blink-open hero-blink-open-active"
      : "hero-blink-open",
    blinkLidClass: isVisible
      ? "hero-blink-lid hero-blink-lid-active"
      : "hero-blink-lid",
  };
  const floatClass = isVisible ? "hero-float-active" : "";
  const auraClass = isVisible ? "hero-aura-active" : "";

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

        <g
          className={`${classes.fillClass} ${auraClass}`}
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

        <g className={floatClass}>
          <PortraitTorso classes={classes} />
          <g className="hero-layer-head">
            <PortraitHeadBase classes={classes} />
            <PortraitFeatures
              leftEyeClipId={leftEyeClipId}
              rightEyeClipId={rightEyeClipId}
              classes={classes}
            />
          </g>
        </g>
      </svg>
    </div>
  );
}
