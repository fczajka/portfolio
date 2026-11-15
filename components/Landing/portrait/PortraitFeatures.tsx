import PortraitEye from "./PortraitEye";
import {
  EYEBROW_PATHS,
  EYE_LEFT_PATH,
  EYE_RIGHT_PATH,
  INK_STROKE,
  cssVars,
  type PortraitClasses,
} from "./constants";

type PortraitFeaturesProps = {
  leftEyeClipId: string;
  rightEyeClipId: string;
  classes: PortraitClasses;
};

/** Renders eyebrows, blinking eyes, nose, and smile inside the facial features parallax layer. */
export default function PortraitFeatures({
  leftEyeClipId,
  rightEyeClipId,
  classes,
}: PortraitFeaturesProps) {
  const { strokeClass } = classes;

  return (
    <g className="hero-layer-features">
      <g className="transition-transform duration-300 ease-out group-hover:-translate-y-0.5 motion-reduce:transition-none">
        {EYEBROW_PATHS.map((brow) => (
          <path
            key={brow.id}
            d={brow.path}
            pathLength={1}
            strokeWidth="11.5"
            className={`${INK_STROKE} ${strokeClass}`}
            style={cssVars({
              "--draw-delay": brow.drawDelay,
              "--draw-duration": "0.36s",
            })}
          />
        ))}
      </g>

      <PortraitEye
        clipId={leftEyeClipId}
        eyePath={EYE_LEFT_PATH}
        lidPath="M 191 217 Q 207 223 223 217"
        transformOrigin="207px 216px"
        pupilCx="207"
        pupilCy="216"
        highlightCx="205"
        highlightCy="214"
        drawDelay="0.54s"
        classes={classes}
      />

      <PortraitEye
        clipId={rightEyeClipId}
        eyePath={EYE_RIGHT_PATH}
        lidPath="M 279 217 Q 295 223 311 217"
        transformOrigin="295px 216px"
        pupilCx="295"
        pupilCy="216"
        highlightCx="293"
        highlightCy="214"
        drawDelay="0.56s"
        classes={classes}
      />

      <path
        d="M 264 218 C 266 236, 272 248, 277 257 C 281 264, 275 273, 261 274 C 248 275, 236 273, 231 266"
        pathLength={1}
        strokeWidth="6.4"
        className={`${INK_STROKE} ${strokeClass}`}
        style={cssVars({
          "--draw-delay": "0.58s",
          "--draw-duration": "0.42s",
        })}
      />

      <g className="transition-transform duration-300 ease-out origin-[251px_310px] group-hover:scale-x-105 group-hover:-translate-y-px motion-reduce:transition-none">
        <path
          d="M 218 305 Q 251 319 284 305"
          pathLength={1}
          strokeWidth="6.5"
          className={`${INK_STROKE} ${strokeClass}`}
          style={cssVars({
            "--draw-delay": "0.64s",
            "--draw-duration": "0.38s",
          })}
        />
      </g>
    </g>
  );
}
