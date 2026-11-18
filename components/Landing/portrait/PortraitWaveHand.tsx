import { ACCENT_FILL, INK_STROKE, SKIN_FILL } from "./constants";

/** Animated line-art waving hand shown while the portrait greets the visitor. */
export default function PortraitWaveHand() {
  return (
    <g className="hero-wave-active" aria-hidden="true">
      <path
        d="M 103 398 L 106 373 C 115 370, 124 370, 132 373 L 136 397 C 125 400, 114 401, 103 398 Z"
        className={ACCENT_FILL}
      />
      <path
        d="M 103 398 L 106 373 M 132 373 L 136 397"
        strokeWidth="6"
        className={INK_STROKE}
      />
      <path
        d="M 106 374 C 98 358, 92 344, 89 326 C 85 308, 84 297, 89 294 C 94 291, 98 302, 101 317 C 100 294, 99 278, 105 276 C 111 274, 113 292, 114 314 C 115 289, 116 270, 122 270 C 128 270, 128 290, 127 315 C 130 294, 134 278, 140 280 C 145 282, 142 302, 137 325 C 143 323, 152 316, 157 321 C 161 325, 154 338, 142 349 C 138 356, 134 365, 132 374 Z"
        className={SKIN_FILL}
      />
      <path
        d="M 106 374 C 98 358, 92 344, 89 326 C 85 308, 84 297, 89 294 C 94 291, 98 302, 101 317 C 100 294, 99 278, 105 276 C 111 274, 113 292, 114 314 C 115 289, 116 270, 122 270 C 128 270, 128 290, 127 315 C 130 294, 134 278, 140 280 C 145 282, 142 302, 137 325 C 143 323, 152 316, 157 321 C 161 325, 154 338, 142 349 C 138 356, 134 365, 132 374"
        strokeWidth="6"
        className={INK_STROKE}
      />
      <path
        d="M 108 344 Q 120 338 131 346"
        strokeWidth="4.2"
        className={INK_STROKE}
      />
      <path
        d="M 75 297 Q 70 309 74 322 M 164 303 Q 169 315 165 327"
        fill="none"
        strokeWidth="4.2"
        className="stroke-primary-400 dark:stroke-primary-300 [stroke-linecap:round]"
      />
    </g>
  );
}
