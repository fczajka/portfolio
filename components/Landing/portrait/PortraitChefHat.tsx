import { ACCENT_FILL, INK_STROKE } from "./constants";

type ChefHatMotion = "pop" | "wiggle" | "settled";

type PortraitChefHatProps = {
  motion: ChefHatMotion;
  label: string;
};

const TOQUE_PATH =
  "M 192 22 C 166 14, 162 -10, 188 -20 C 198 -44, 232 -52, 251 -44 C 270 -52, 304 -44, 314 -20 C 340 -10, 336 14, 310 22 Q 251 13, 192 22 Z";

const HATBAND_PATH = "M 192 22 Q 251 13, 310 22 L 314 44 Q 251 34, 188 44 Z";

const MOTION_CLASS: Record<ChefHatMotion, string> = {
  pop: "hero-chef-hat-pop",
  wiggle: "hero-chef-hat-wiggle",
  settled: "hero-chef-hat-settled",
};

/** Playful line-art chef hat easter egg unlocked after clicking the hero portrait 5+ times. */
export default function PortraitChefHat({
  motion,
  label,
}: PortraitChefHatProps) {
  return (
    <g
      data-testid="portrait-chef-hat"
      aria-label={label}
      className={MOTION_CLASS[motion]}
    >
      {/* Sparkle accents */}
      <path
        d="M 152 -18 L 142 -26 M 149 -3 L 138 -5 M 350 -18 L 360 -26 M 353 -3 L 364 -5"
        fill="none"
        strokeWidth="4.2"
        className="stroke-primary-400 dark:stroke-primary-300 [stroke-linecap:round]"
      />

      {/* Puffy chef toque crown */}
      <path d={TOQUE_PATH} className="fill-white dark:fill-dark-secondary-bg" />
      <path d={TOQUE_PATH} strokeWidth="6.4" className={INK_STROKE} />

      {/* Subtle toque pleats */}
      <path
        d="M 224 14 C 221 0, 223 -14, 228 -24 M 278 14 C 281 0, 279 -14, 274 -24"
        strokeWidth="4.2"
        className={INK_STROKE}
      />

      {/* Hatband */}
      <path d={HATBAND_PATH} className={ACCENT_FILL} />
      <path
        d="M 191 34 Q 251 25, 311 34"
        fill="none"
        strokeWidth="3"
        className="stroke-zinc-900/35 [stroke-linecap:round]"
      />
      <path d={HATBAND_PATH} strokeWidth="6.4" className={INK_STROKE} />
    </g>
  );
}
