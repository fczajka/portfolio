import type { CSSProperties } from "react";

export type CssVarStyle = CSSProperties & Record<`--${string}`, string>;

export const cssVars = (vars: Record<`--${string}`, string>): CssVarStyle =>
  vars;

export type PortraitClasses = {
  strokeClass: string;
  fillClass: string;
  blinkOpenClass: string;
  blinkLidClass: string;
};

export const INK_STROKE =
  "fill-none stroke-zinc-900 dark:stroke-zinc-100 [stroke-linecap:round] [stroke-linejoin:round]";
export const SKIN_FILL = "fill-zinc-50 dark:fill-dark-primary-bg";
export const ACCENT_FILL = "fill-primary-100 dark:fill-primary-200";

export const EYE_LEFT_PATH =
  "M 191.5 216 C 191.5 207.5, 198.5 204.5, 207 204.5 C 215.5 204.5, 222.5 208, 222.5 216 C 222.5 224, 215.5 227.5, 207 227.5 C 198.5 227.5, 191.5 224, 191.5 216 Z";

export const EYE_RIGHT_PATH =
  "M 279.5 216 C 279.5 207.5, 286.5 204.5, 295 204.5 C 303.5 204.5, 310.5 208, 310.5 216 C 310.5 224, 303.5 227.5, 295 227.5 C 286.5 227.5, 279.5 224, 279.5 216 Z";

export const HAIR_CROWN_PATH =
  "M 167 118 L 152 118 C 150 100, 158 88, 174 86 L 165 81 C 172 67, 185 59, 197 56 L 189 50 C 204 37, 222 32, 238 32 L 234 39 C 244 28, 256 25, 264 33 L 274 25 C 300 31, 326 48, 338 78 C 344 93, 345 106, 342 116 L 334 118 C 316 98, 286 92, 260 100 C 248 104, 236 112, 224 123 L 234 102 C 210 101, 186 106, 167 118 Z";

export const SHIRT_FILL_PATH =
  "M 88 456 C 95 424, 105 404, 130 398 C 156 391, 179 388, 199 382 C 219 406, 236 422, 251 422 C 266 422, 285 406, 305 383 C 325 389, 350 392, 374 398 C 398 404, 409 424, 416 456 C 394 463, 370 454, 344 460 C 316 466, 290 453, 256 460 C 222 466, 196 454, 166 460 C 136 466, 110 454, 88 456 Z";

export const SHIRT_OUTLINE_PATH =
  "M 88 456 C 95 424, 105 404, 130 398 C 156 391, 179 388, 199 382 C 219 406, 236 422, 251 422 C 266 422, 285 406, 305 383 C 325 389, 350 392, 374 398 C 398 404, 409 424, 416 456";

export const EAR_PATHS = [
  {
    id: "left",
    fillPath:
      "M 163 206 C 151 196, 140 194, 140 206 C 140 220, 148 238, 154 252 C 157 262, 161 268, 166 271 Z",
    outerPath:
      "M 163 206 C 151 196, 140 194, 140 206 C 140 220, 148 238, 154 252 C 157 262, 161 268, 166 271",
    innerPath: "M 149 214 C 155 222, 156 233, 153 243",
  },
  {
    id: "right",
    fillPath:
      "M 337 206 C 349 196, 360 194, 360 206 C 360 220, 352 238, 346 252 C 343 262, 339 268, 334 271 Z",
    outerPath:
      "M 337 206 C 349 196, 360 194, 360 206 C 360 220, 352 238, 346 252 C 343 262, 339 268, 334 271",
    innerPath: "M 351 214 C 345 222, 344 233, 347 243",
  },
] as const;

export const SIDEBURN_PATHS = [
  {
    id: "left",
    fillPath:
      "M 163 196 C 155 170, 152 148, 153 132 L 166 132 C 164 152, 163 174, 163 196 Z",
    strokePath: "M 166 132 L 153 132 C 152 148, 155 170, 162 195",
  },
  {
    id: "right",
    fillPath:
      "M 338 194 C 345 168, 348 146, 347 130 L 334 130 C 336 150, 337 172, 338 194 Z",
    strokePath: "M 334 130 L 347 130 C 348 146, 345 168, 339 193",
  },
] as const;

export const EYEBROW_PATHS = [
  {
    id: "left",
    path: "M 173 182 C 190 170, 214 169, 233 177",
    drawDelay: "0.5s",
  },
  {
    id: "right",
    path: "M 270 177 C 289 169, 313 170, 330 182",
    drawDelay: "0.52s",
  },
] as const;
