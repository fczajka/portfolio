import {
  INK_STROKE,
  SKIN_FILL,
  cssVars,
  type PortraitClasses,
} from "./constants";

type PortraitEyeProps = {
  clipId: string;
  eyePath: string;
  lidPath: string;
  winkPath?: string;
  isWinking?: boolean;
  transformOrigin: string;
  pupilCx: string;
  pupilCy: string;
  highlightCx: string;
  highlightCy: string;
  drawDelay: string;
  classes: PortraitClasses;
};

/** Renders an animated eye with clipped pupil parallax, automatic blink, and optional cheerful wink. */
export default function PortraitEye({
  clipId,
  eyePath,
  lidPath,
  winkPath,
  isWinking = false,
  transformOrigin,
  pupilCx,
  pupilCy,
  highlightCx,
  highlightCy,
  drawDelay,
  classes,
}: PortraitEyeProps) {
  const { strokeClass, fillClass, blinkOpenClass, blinkLidClass } = classes;

  return (
    <>
      <g
        className={isWinking ? "opacity-0" : blinkOpenClass}
        style={{ transformOrigin }}
      >
        <path
          d={eyePath}
          className={`${SKIN_FILL} ${fillClass}`}
          style={cssVars({ "--fill-delay": "0.62s" })}
        />
        <g clipPath={`url(#${clipId})`}>
          <g className="hero-pupil">
            <circle
              cx={pupilCx}
              cy={pupilCy}
              r="5.8"
              className={`fill-zinc-900 dark:fill-zinc-100 ${fillClass}`}
              style={cssVars({ "--fill-delay": "0.72s" })}
            />
            <circle
              cx={highlightCx}
              cy={highlightCy}
              r="1.7"
              className={`${SKIN_FILL} ${fillClass}`}
              style={cssVars({ "--fill-delay": "0.74s" })}
            />
          </g>
        </g>
        <path
          d={eyePath}
          pathLength={1}
          strokeWidth="6.2"
          className={`${INK_STROKE} ${strokeClass}`}
          style={cssVars({
            "--draw-delay": drawDelay,
            "--draw-duration": "0.38s",
          })}
        />
      </g>
      {isWinking ? (
        <path
          d={winkPath ?? lidPath}
          strokeWidth="6.5"
          className={INK_STROKE}
        />
      ) : (
        <path
          d={lidPath}
          strokeWidth="6.2"
          className={`${INK_STROKE} ${blinkLidClass}`}
        />
      )}
    </>
  );
}
