export const colors = {
  brand: {
    primary: '#005EB8',
    primarySoft: '#2B7FD1',
    accent: '#00A86B',
    accentSoft: '#2FC088',
  },
  bg: {
    base: '#0B1220',
    surface: '#111A2E',
    raised: '#182340',
    muted: '#0E1729',
  },
  text: {
    primary: '#F2F5FA',
    secondary: '#A9B3C7',
    muted: '#6B7691',
    inverse: '#0B1220',
  },
  border: {
    subtle: '#1C2741',
    strong: '#2A3759',
  },
  state: {
    success: '#00A86B',
    warning: '#F5A524',
    danger: '#F04438',
    info: '#2B7FD1',
  },
} as const;

export const spacing = {
  xxs: 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

export const typography = {
  family: {
    sans: 'Inter',
    mono: 'JetBrainsMono',
  },
  size: {
    xs: 11,
    sm: 13,
    md: 15,
    lg: 17,
    xl: 20,
    xxl: 24,
    display: 32,
  },
  weight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
} as const;

export const shadow = {
  card: {
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
} as const;

export type Colors = typeof colors;
export type Spacing = typeof spacing;
