import { Fragment } from "react";
import {
  ACCENT_FILL,
  EAR_PATHS,
  HAIR_CROWN_PATH,
  INK_STROKE,
  SIDEBURN_PATHS,
  SKIN_FILL,
  cssVars,
  type PortraitClasses,
} from "./constants";

type PortraitHeadBaseProps = {
  classes: PortraitClasses;
};

/** Renders ears, face contour, sideburns, and hair crown inside the head parallax layer. */
export default function PortraitHeadBase({ classes }: PortraitHeadBaseProps) {
  const { strokeClass, fillClass } = classes;

  return (
    <>
      {EAR_PATHS.map((ear) => (
        <Fragment key={ear.id}>
          <path
            d={ear.fillPath}
            className={`${SKIN_FILL} ${fillClass}`}
            style={cssVars({ "--fill-delay": "0.45s" })}
          />
          <path
            d={ear.outerPath}
            pathLength={1}
            strokeWidth="6.5"
            className={`${INK_STROKE} ${strokeClass}`}
            style={cssVars({
              "--draw-delay": "0.28s",
              "--draw-duration": "0.45s",
            })}
          />
          <path
            d={ear.innerPath}
            pathLength={1}
            strokeWidth="5"
            className={`${INK_STROKE} ${strokeClass}`}
            style={cssVars({
              "--draw-delay": "0.42s",
              "--draw-duration": "0.28s",
            })}
          />
        </Fragment>
      ))}

      <path
        d="M 166 132 C 161 178, 160 224, 164 268 C 167 296, 178 320, 202 340 C 222 355, 238 358, 251 358 C 264 358, 280 355, 300 340 C 324 320, 335 296, 338 268 C 342 224, 340 178, 334 130 C 318 72, 182 72, 166 132 Z"
        className={`${SKIN_FILL} ${fillClass}`}
        style={cssVars({ "--fill-delay": "0.42s" })}
      />
      <path
        d="M 166 132 C 161 178, 160 224, 164 268 C 167 296, 178 320, 202 340 C 222 355, 238 358, 251 358 C 264 358, 280 355, 300 340 C 324 320, 335 296, 338 268 C 342 224, 340 178, 334 130"
        pathLength={1}
        strokeWidth="6.8"
        className={`${INK_STROKE} ${strokeClass}`}
        style={cssVars({
          "--draw-delay": "0.12s",
          "--draw-duration": "0.72s",
        })}
      />

      {SIDEBURN_PATHS.map((sideburn) => (
        <Fragment key={sideburn.id}>
          <path
            d={sideburn.fillPath}
            className={`${ACCENT_FILL} ${fillClass}`}
            style={cssVars({ "--fill-delay": "0.68s" })}
          />
          <path
            d={sideburn.strokePath}
            pathLength={1}
            strokeWidth="6.2"
            className={`${INK_STROKE} ${strokeClass}`}
            style={cssVars({
              "--draw-delay": "0.32s",
              "--draw-duration": "0.42s",
            })}
          />
        </Fragment>
      ))}
      <path
        d={HAIR_CROWN_PATH}
        className={`${ACCENT_FILL} ${fillClass}`}
        style={cssVars({ "--fill-delay": "0.66s" })}
      />
      <path
        d={HAIR_CROWN_PATH}
        pathLength={1}
        strokeWidth="6.8"
        className={`${INK_STROKE} ${strokeClass}`}
        style={cssVars({
          "--draw-delay": "0.26s",
          "--draw-duration": "0.82s",
        })}
      />
    </>
  );
}
