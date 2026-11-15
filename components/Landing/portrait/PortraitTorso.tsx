import {
  ACCENT_FILL,
  INK_STROKE,
  SHIRT_FILL_PATH,
  SHIRT_OUTLINE_PATH,
  SKIN_FILL,
  cssVars,
  type PortraitClasses,
} from "./constants";

type PortraitTorsoProps = {
  classes: PortraitClasses;
};

/** Renders the animated neck and T-shirt shoulders layer of the hero portrait. */
export default function PortraitTorso({ classes }: PortraitTorsoProps) {
  const { strokeClass, fillClass } = classes;

  return (
    <g className="hero-layer-torso">
      <path
        d="M 208 336 L 294 336 C 292 359, 296 373, 306 383 C 286 406, 267 422, 251 422 C 236 422, 218 406, 198 382 C 207 372, 211 359, 208 336 Z"
        className={`${SKIN_FILL} ${fillClass}`}
        style={cssVars({ "--fill-delay": "0.45s" })}
      />
      <path
        d={SHIRT_FILL_PATH}
        className={`${ACCENT_FILL} ${fillClass}`}
        style={cssVars({ "--fill-delay": "0.7s" })}
      />
      <path
        d={SHIRT_OUTLINE_PATH}
        pathLength={1}
        strokeWidth="6.8"
        className={`${INK_STROKE} ${strokeClass}`}
        style={cssVars({
          "--draw-delay": "0.22s",
          "--draw-duration": "0.7s",
        })}
      />
      <path
        d="M 208 338 C 211 359, 209 372, 199 382"
        pathLength={1}
        strokeWidth="6.5"
        className={`${INK_STROKE} ${strokeClass}`}
        style={cssVars({
          "--draw-delay": "0.38s",
          "--draw-duration": "0.38s",
        })}
      />
      <path
        d="M 294 338 C 291 359, 293 372, 305 383"
        pathLength={1}
        strokeWidth="6.5"
        className={`${INK_STROKE} ${strokeClass}`}
        style={cssVars({
          "--draw-delay": "0.38s",
          "--draw-duration": "0.38s",
        })}
      />
      <path
        d="M 239 384 Q 251 391 264 384"
        pathLength={1}
        strokeWidth="5.5"
        className={`${INK_STROKE} ${strokeClass}`}
        style={cssVars({
          "--draw-delay": "0.55s",
          "--draw-duration": "0.3s",
        })}
      />
    </g>
  );
}
