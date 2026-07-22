/** Shared z-index scale, used later by Modal/Dropdown so layers never collide. */
export const Z_INDEX = {
  dropdown: 1000,
  modal: 1300,
  toast: 1500,
  tooltip: 1600,
} as const;
