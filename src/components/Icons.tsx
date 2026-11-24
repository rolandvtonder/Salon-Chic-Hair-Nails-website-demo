import type { SVGProps } from "react";

/** One icon family: 24px grid, 1.5 stroke, round caps. Decorative by default. */
type P = SVGProps<SVGSVGElement>;

const base = (props: P) => ({
  width: 20,
  height: 20,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
  ...props,
});

export const PhoneIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M5 3.5h3.2l1.6 4.2-2.1 1.5a11.5 11.5 0 0 0 7.1 7.1l1.5-2.1 4.2 1.6V19a1.5 1.5 0 0 1-1.6 1.5C10.4 20 4 13.6 3.5 5.1A1.5 1.5 0 0 1 5 3.5Z" />
  </svg>
);

export const WhatsAppIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M3.5 20.5l1.3-4.3A8.5 8.5 0 1 1 8 19.3l-4.5 1.2Z" />
    <path d="M9 8.3c.2-.5.6-.6 1-.5l.9 2c.1.3 0 .6-.2.8l-.5.5a5.2 5.2 0 0 0 2.7 2.7l.5-.5c.2-.2.5-.3.8-.2l2 .9c.1.4 0 .8-.5 1-1.6 1-5.1-.6-6.5-3-.7-1.2-.9-2.8-.2-3.7Z" />
  </svg>
);

export const MailIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3" y="5" width="18" height="14" rx="1.5" />
    <path d="m3.5 6 8.5 7 8.5-7" />
  </svg>
);

export const PinIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M12 21s-6.5-6.1-6.5-11a6.5 6.5 0 0 1 13 0c0 4.9-6.5 11-6.5 11Z" />
    <circle cx="12" cy="10" r="2.3" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="8.5" />
    <path d="M12 7.5V12l3 2" />
  </svg>
);

export const ArrowIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M4 12h15m-5.5-6 6 6-6 6" />
  </svg>
);

export const InstagramIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
    <circle cx="12" cy="12" r="3.8" />
    <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
  </svg>
);

export const FacebookIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="M14.5 8.5H16V5h-2a4 4 0 0 0-4 4v2H8v3.5h2V21h3.5v-6.5H16l.5-3.5h-3V9.5a1 1 0 0 1 1-1Z" />
  </svg>
);

export const GiftIcon = (p: P) => (
  <svg {...base(p)}>
    <rect x="3.5" y="8.5" width="17" height="4" rx="0.8" />
    <path d="M5 12.5v8h14v-8M12 8.5v12M12 8.5S10.5 4 8 4.5 7 8.5 12 8.5Zm0 0s1.5-4.5 4-4 1 4-4 4Z" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...base(p)}>
    <path d="m5 12.5 4.5 4.5L19 7.5" />
  </svg>
);
