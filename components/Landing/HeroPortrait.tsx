"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useLocale } from "@/components/Providers/LocaleProvider";
import { getUiCopy } from "@/data/content";
import { usePortraitParallax } from "@/hooks/usePortraitParallax";
import PortraitChefHat from "./portrait/PortraitChefHat";
import PortraitFeatures from "./portrait/PortraitFeatures";
import PortraitHeadBase from "./portrait/PortraitHeadBase";
import PortraitTorso from "./portrait/PortraitTorso";
import PortraitWaveHand from "./portrait/PortraitWaveHand";
import {
  EYE_LEFT_PATH,
  EYE_RIGHT_PATH,
  cssVars,
  type PortraitClasses,
} from "./portrait/constants";

type HeroPortraitProps = {
  isVisible: boolean;
  className?: string;
};

const GREETING_DURATION_MS = 3200;
export const CHEF_HAT_UNLOCK_CLICKS = 5;

/** Interactive animated line-art portrait with parallax, blinking, click-to-greet animation, and a 5-click chef hat easter egg. */
export default function HeroPortrait({
  isVisible,
  className = "",
}: HeroPortraitProps) {
  const { locale } = useLocale();
  const { portrait: copy } = getUiCopy(locale);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<number | null>(null);
  const rawId = useId().replace(/:/g, "");
  const leftEyeClipId = `hero-left-eye-${rawId}`;
  const rightEyeClipId = `hero-right-eye-${rawId}`;
  const auraGradientId = `hero-aura-${rawId}`;

  const [isGreeting, setIsGreeting] = useState(false);
  const [greetingCount, setGreetingCount] = useState(0);

  usePortraitParallax(containerRef, isVisible);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleSayHi = () => {
    setGreetingCount((prev) => prev + 1);
    setIsGreeting(true);

    if (timerRef.current !== null) {
      window.clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      timerRef.current = null;
      setIsGreeting(false);
    }, GREETING_DURATION_MS);
  };

  const isChefMode = greetingCount >= CHEF_HAT_UNLOCK_CLICKS;
  const activeGreeting = (() => {
    if (greetingCount === CHEF_HAT_UNLOCK_CLICKS) {
      return copy.chefUnlockGreeting;
    }
    if (greetingCount > CHEF_HAT_UNLOCK_CLICKS) {
      const chefPool = [...copy.chefGreetings, ...copy.greetings];
      const offset = greetingCount - CHEF_HAT_UNLOCK_CLICKS - 1;
      return chefPool[offset % chefPool.length] ?? copy.chefUnlockGreeting;
    }
    const index = Math.max(0, greetingCount - 1);
    return copy.greetings[index % copy.greetings.length] ?? copy.greetings[0];
  })();

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
      className={`group relative w-full max-w-[19rem] sm:max-w-[23rem] md:max-w-[27rem] lg:max-w-[34rem] xl:max-w-[37rem] mx-auto flex items-center justify-center select-none ${className}`}
    >
      {isGreeting && (
        <div
          key={greetingCount}
          role="status"
          aria-live="polite"
          className="hero-bubble-pop pointer-events-none absolute top-1 right-1 z-20 rounded-2xl bg-zinc-200 px-3.5 py-2 font-headline text-sm tracking-wide text-zinc-900 dark:bg-dark-secondary-bg dark:text-zinc-100 sm:top-4 sm:right-3 sm:px-4 sm:py-2.5 sm:text-base lg:top-6 lg:right-4 lg:text-lg"
        >
          <span>{activeGreeting}</span>
          <span
            aria-hidden="true"
            className="absolute -bottom-1.5 left-5 h-3.5 w-3.5 rotate-45 bg-zinc-200 dark:bg-dark-secondary-bg"
          />
        </div>
      )}

      <button
        type="button"
        onClick={handleSayHi}
        aria-label={copy.buttonAria}
        className="relative flex w-full items-center justify-center rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-4 dark:focus-visible:ring-offset-dark-primary-bg"
      >
        <svg
          viewBox="64 12 374 466"
          role="img"
          aria-label={copy.svgAria}
          className="w-full h-auto max-h-[35dvh] min-[400px]:max-h-[41dvh] sm:max-h-[45dvh] lg:max-h-[78dvh] overflow-visible"
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
              {isChefMode && (
                <PortraitChefHat
                  key={
                    greetingCount > CHEF_HAT_UNLOCK_CLICKS && isGreeting
                      ? `wiggle-${greetingCount}`
                      : "chef-hat"
                  }
                  motion={
                    greetingCount === CHEF_HAT_UNLOCK_CLICKS
                      ? "pop"
                      : isGreeting
                        ? "wiggle"
                        : "settled"
                  }
                  label={copy.chefHatLabel}
                />
              )}
              <PortraitFeatures
                leftEyeClipId={leftEyeClipId}
                rightEyeClipId={rightEyeClipId}
                classes={classes}
                isGreeting={isGreeting}
              />
            </g>
            {isGreeting && <PortraitWaveHand key={greetingCount} />}
          </g>
        </svg>

        {!isGreeting && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute bottom-2 rounded-full bg-zinc-200/80 px-3 py-1 text-xs font-semibold text-zinc-700 opacity-0 backdrop-blur-xs transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 dark:bg-dark-secondary-bg/95 dark:text-zinc-200 motion-reduce:transition-none"
          >
            {copy.hoverHint}
          </span>
        )}
      </button>
    </div>
  );
}
