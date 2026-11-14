export type RgbColor = {
  r: number;
  g: number;
  b: number;
};

export type ProjectBorderPalette = {
  lightBorder: string;
  darkBorder: string;
  lightShadow: string;
};

const SAMPLE_SIZE = 32;
const MIN_ALPHA = 32;

const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

export function rgbToHsl({ r, g, b }: RgbColor): {
  h: number;
  s: number;
  l: number;
} {
  const rn = r / 255;
  const gn = g / 255;
  const bn = b / 255;
  const max = Math.max(rn, gn, bn);
  const min = Math.min(rn, gn, bn);
  const delta = max - min;
  const l = (max + min) / 2;

  if (delta === 0) {
    return { h: 0, s: 0, l };
  }

  const s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
  let h = 0;
  if (max === rn) {
    h = (gn - bn) / delta + (gn < bn ? 6 : 0);
  } else if (max === gn) {
    h = (bn - rn) / delta + 2;
  } else {
    h = (rn - gn) / delta + 4;
  }

  return { h: h * 60, s, l };
}

export function hslToRgb(h: number, s: number, l: number): RgbColor {
  if (s === 0) {
    const channel = Math.round(l * 255);
    return { r: channel, g: channel, b: channel };
  }

  const hueToChannel = (p: number, q: number, tInput: number): number => {
    let t = tInput;
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  };

  const hNorm = (((h % 360) + 360) % 360) / 360;
  const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
  const p = 2 * l - q;

  return {
    r: Math.round(hueToChannel(p, q, hNorm + 1 / 3) * 255),
    g: Math.round(hueToChannel(p, q, hNorm) * 255),
    b: Math.round(hueToChannel(p, q, hNorm - 1 / 3) * 255),
  };
}

/** Computes the alpha-weighted average RGB color of an already-loaded image element. */
export function extractAverageRgb(img: HTMLImageElement): RgbColor | null {
  if (!img.complete || img.naturalWidth === 0 || img.naturalHeight === 0) {
    return null;
  }

  const canvas = document.createElement("canvas");
  canvas.width = SAMPLE_SIZE;
  canvas.height = SAMPLE_SIZE;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return null;

  try {
    ctx.drawImage(img, 0, 0, SAMPLE_SIZE, SAMPLE_SIZE);
    const { data } = ctx.getImageData(0, 0, SAMPLE_SIZE, SAMPLE_SIZE);

    let rSum = 0;
    let gSum = 0;
    let bSum = 0;
    let weightSum = 0;

    for (let i = 0; i < data.length; i += 4) {
      const alpha = data[i + 3];
      if (alpha < MIN_ALPHA) continue;
      const weight = alpha / 255;
      rSum += data[i] * weight;
      gSum += data[i + 1] * weight;
      bSum += data[i + 2] * weight;
      weightSum += weight;
    }

    if (weightSum === 0) return null;

    return {
      r: Math.round(rSum / weightSum),
      g: Math.round(gSum / weightSum),
      b: Math.round(bSum / weightSum),
    };
  } catch {
    return null;
  }
}

/** Builds light/dark border and light-mode shadow colors from a logo's average RGB. */
export function formatProjectBorderColors(rgb: RgbColor): ProjectBorderPalette {
  const { h, s, l } = rgbToHsl(rgb);
  const lightRgb = hslToRgb(h, s, clamp(l, 0.34, 0.5));
  const darkRgb = hslToRgb(h, s, clamp(l, 0.5, 0.78));

  return {
    lightBorder: `rgb(${lightRgb.r}, ${lightRgb.g}, ${lightRgb.b})`,
    darkBorder: `rgb(${darkRgb.r}, ${darkRgb.g}, ${darkRgb.b})`,
    lightShadow: `rgba(${lightRgb.r}, ${lightRgb.g}, ${lightRgb.b}, 0.25)`,
  };
}
