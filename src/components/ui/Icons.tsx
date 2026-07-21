/**
 * Custom hairline icon set.
 * Deliberately not Lucide/Feather — 1.25 stroke, rounded caps, one consistent weight.
 */

type IconProps = {
  className?: string;
  strokeWidth?: number;
};

const base = (className?: string) => ({
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor" as const,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": true,
});

export const ArrowUpRight = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M7 17 17 7M9 7h8v8" />
  </svg>
);

export const ArrowRight = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M4 12h16M14 6l6 6-6 6" />
  </svg>
);

export const ArrowDown = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M12 4v16M6 14l6 6 6-6" />
  </svg>
);

export const Close = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const Phone = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M8.4 3.6H5.2A1.7 1.7 0 0 0 3.5 5.4c0 8.3 6.8 15.1 15.1 15.1a1.7 1.7 0 0 0 1.8-1.7v-3.2l-4-1.6-2 2a12.6 12.6 0 0 1-6.4-6.4l2-2z" />
  </svg>
);

export const Mail = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <rect x="2.75" y="5" width="18.5" height="14" rx="2.5" />
    <path d="M3.5 7.5 12 13l8.5-5.5" />
  </svg>
);

export const Clock = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M12 7v5.3l3.4 2" />
  </svg>
);

export const Check = ({ className, strokeWidth = 1.5 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M4.5 12.5 9.5 17.5 19.5 6.5" />
  </svg>
);

export const Download = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M12 3.5v11M7.5 10.5 12 15l4.5-4.5M4 17.5v1.5a1.5 1.5 0 0 0 1.5 1.5h13a1.5 1.5 0 0 0 1.5-1.5v-1.5" />
  </svg>
);

/** Expand — used on showcase tiles instead of a magnifier cliche */
export const Expand = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M9 3.75H4.5A.75.75 0 0 0 3.75 4.5V9M15 3.75h4.5a.75.75 0 0 1 .75.75V9M9 20.25H4.5a.75.75 0 0 1-.75-.75V15M15 20.25h4.5a.75.75 0 0 0 .75-.75V15" />
  </svg>
);

/** Bolt — automation / speed, replaces the rocketship cliche */
export const Bolt = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M13.2 2.5 4.8 13.2h6l-1.6 8.3 8.9-11.1h-6.2z" />
  </svg>
);

/** Aperture — precision targeting, replaces the bullseye cliche */
export const Aperture = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M12 3.25 16.5 11M20.5 14.5h-8.9M15.5 20.4 11 12.6M3.5 14.5 8 6.8M3.9 9.5h8.9" />
  </svg>
);

/** Waveform — analytics, replaces the generic bar-chart icon */
export const Waveform = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M3.5 12h2.6l2.2-6.4 3.4 12.8 2.6-8.2 1.7 3.6h4.5" />
  </svg>
);

/** Stack — layered structure / campaign architecture */
export const Stack = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="m12 3 8.5 4.4L12 11.8 3.5 7.4z" />
    <path d="m3.5 12 8.5 4.4 8.5-4.4M3.5 16.6 12 21l8.5-4.4" />
  </svg>
);

/** Fingerprint — identity / audience, replaces the shield cliche */
export const Fingerprint = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M4.2 9.4a8.7 8.7 0 0 1 15.6 0M7 12.5a5.2 5.2 0 0 1 10 0c0 3-.6 5.6-1.6 7.9M12 12.5v3.2c0 1.9-.3 3.7-.9 5.4M9.2 20.6c.9-2 1.3-4.1 1.3-6.3v-1.8" />
  </svg>
);

/** Spark — creative / ideas */
export const Spark = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M12 3.2c.6 4.4 1.9 5.7 6.3 6.3-4.4.6-5.7 1.9-6.3 6.3-.6-4.4-1.9-5.7-6.3-6.3 4.4-.6 5.7-1.9 6.3-6.3zM18.5 15.5c.3 2.1.9 2.7 3 3-2.1.3-2.7.9-3 3-.3-2.1-.9-2.7-3-3 2.1-.3 2.7-.9 3-3z" />
  </svg>
);

export const Globe = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <circle cx="12" cy="12" r="8.75" />
    <path d="M3.5 12h17M12 3.25c2.2 2.4 3.4 5.5 3.4 8.75S14.2 18.35 12 20.75c-2.2-2.4-3.4-5.5-3.4-8.75S9.8 5.65 12 3.25z" />
  </svg>
);

export const Pin = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <path d="M12 21.5s7-6.1 7-11.2a7 7 0 1 0-14 0c0 5.1 7 11.2 7 11.2z" />
    <circle cx="12" cy="10" r="2.6" />
  </svg>
);

export const Vault = ({ className, strokeWidth = 1.25 }: IconProps) => (
  <svg {...base(className)} strokeWidth={strokeWidth}>
    <rect x="3" y="4" width="18" height="16" rx="2.5" />
    <circle cx="11" cy="12" r="3.6" />
    <path d="M11 6.5v1.9M11 15.6v1.9M17.4 9.5v5" />
  </svg>
);
