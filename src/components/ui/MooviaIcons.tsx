// Solid silhouette icons in the MOOVIA visual language —
// chunky, organic, monochrome filled shapes (matching aviao/casa/pessoa/ponte).
// Render in gold via `color` prop on the wrapping <svg>.

import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

const base = (size: number): SVGProps<SVGSVGElement> => ({
  width: size,
  height: size,
  viewBox: "0 0 64 64",
  fill: "currentColor",
  xmlns: "http://www.w3.org/2000/svg",
  "aria-hidden": true,
});

export function LayersIcon({ size = 28, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M32 6c-1.6 0-3 .5-7.8 2.9C13 14.5 8 17.4 8 19.2c0 1.7 5 4.6 16.2 10.3 4.8 2.4 6.2 2.9 7.8 2.9s3-.5 7.8-2.9C51 23.8 56 20.9 56 19.2c0-1.8-5-4.7-16.2-10.3C35 6.5 33.6 6 32 6Z" />
      <path d="M11.4 30.6c-2.2 1.1-3.4 2-3.4 3 0 1.7 5 4.6 16.2 10.3 4.8 2.4 6.2 2.9 7.8 2.9s3-.5 7.8-2.9C51 38.2 56 35.3 56 33.6c0-1-1.2-1.9-3.4-3l-9.7 5c-4.8 2.4-6.2 2.9-7.8 2.9s-3-.5-7.8-2.9l-9.9-5Z" />
      <path d="M11.4 44.8C9.2 45.9 8 46.8 8 47.8c0 1.7 5 4.6 16.2 10.3 4.8 2.4 6.2 2.9 7.8 2.9s3-.5 7.8-2.9C51 52.4 56 49.5 56 47.8c0-1-1.2-1.9-3.4-3l-9.7 5c-4.8 2.4-6.2 2.9-7.8 2.9s-3-.5-7.8-2.9l-9.9-5Z" />
    </svg>
  );
}

export function SearchIcon({ size = 28, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M28 6C16.4 6 7 15.4 7 27s9.4 21 21 21c4.5 0 8.6-1.4 12-3.8l9.6 9.6c1.6 1.6 4.2 1.6 5.8 0 1.6-1.6 1.6-4.2 0-5.8l-9.6-9.6C48.6 35.6 50 31.5 50 27 50 15.4 40.6 6 29 6h-1Zm.5 7C36.5 13 43 19.5 43 27.5S36.5 42 28.5 42 14 35.5 14 27.5 20.5 13 28.5 13Z" />
    </svg>
  );
}

export function AlertIcon({ size = 28, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M32 5c-2 0-3.7 1-4.8 2.9L4.7 49.1C2.6 52.9 5.4 57.6 9.8 57.6h44.4c4.4 0 7.2-4.7 5.1-8.5L36.8 7.9C35.7 6 34 5 32 5Zm0 14c1.7 0 3 1.3 3 3v12c0 1.7-1.3 3-3 3s-3-1.3-3-3V22c0-1.7 1.3-3 3-3Zm0 24a3.5 3.5 0 1 1 0 7 3.5 3.5 0 0 1 0-7Z" />
    </svg>
  );
}

export function ClockIcon({ size = 28, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M32 6C17.6 6 6 17.6 6 32s11.6 26 26 26 26-11.6 26-26S46.4 6 32 6Zm0 8c2 0 3.5 1.5 3.5 3.5V31l9.3 5.4c1.7 1 2.3 3.1 1.3 4.8-1 1.7-3.1 2.3-4.8 1.3l-11-6.4c-1.1-.6-1.8-1.8-1.8-3V17.5c0-2 1.5-3.5 3.5-3.5Z" />
    </svg>
  );
}

export function FileIcon({ size = 28, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M16 4c-3.3 0-6 2.7-6 6v44c0 3.3 2.7 6 6 6h32c3.3 0 6-2.7 6-6V22L38 4H16Zm22 2.5V18c0 2.2 1.8 4 4 4h11.5L38 6.5ZM20 30h24c1.4 0 2.5 1.1 2.5 2.5S45.4 35 44 35H20c-1.4 0-2.5-1.1-2.5-2.5S18.6 30 20 30Zm0 12h24c1.4 0 2.5 1.1 2.5 2.5S45.4 47 44 47H20c-1.4 0-2.5-1.1-2.5-2.5S18.6 42 20 42Z" />
    </svg>
  );
}

export function CoinIcon({ size = 28, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M32 6C17.6 6 6 17.6 6 32s11.6 26 26 26 26-11.6 26-26S46.4 6 32 6Zm1 9c1.7 0 3 1.3 3 3v2.3c2.6.5 4.8 1.8 6.4 3.7 1 1.2.9 3-.3 4.1-1.2 1-3 .9-4.1-.3-1-1.2-2.5-2-4.5-2-2.8 0-4.5 1.4-4.5 3.2 0 1.5 1 2.4 5 3.4 5.8 1.4 9.5 3.7 9.5 8.7 0 4-2.8 6.9-7.5 7.7V51c0 1.7-1.3 3-3 3s-3-1.3-3-3v-2.3c-2.9-.5-5.3-2-6.9-4.1-1-1.3-.8-3.1.5-4.1 1.3-1 3.1-.8 4.1.5 1.1 1.4 2.8 2.3 4.8 2.3 3.1 0 4.7-1.4 4.7-3.3 0-1.6-1.2-2.6-5.4-3.6-5.5-1.4-9.1-3.6-9.1-8.5 0-3.8 2.6-6.6 7-7.5V18c0-1.7 1.3-3 3-3Z" />
    </svg>
  );
}

export function UserIcon({ size = 28, ...p }: IconProps) {
  return (
    <svg {...base(size)} {...p}>
      <path d="M32 6c-7.2 0-13 5.8-13 13s5.8 13 13 13 13-5.8 13-13S39.2 6 32 6Zm0 30C19.3 36 8 41.7 8 50v4c0 2.2 1.8 4 4 4h40c2.2 0 4-1.8 4-4v-4c0-8.3-11.3-14-24-14Z" />
    </svg>
  );
}
