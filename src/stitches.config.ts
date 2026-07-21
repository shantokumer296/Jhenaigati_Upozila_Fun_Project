import { createStitches } from '@stitches/react';

export const {
  styled,
  css,
  globalCss,
  keyframes,
  theme,
  createTheme,
  config,
} = createStitches({
  theme: {
    colors: {
      primary: '#1a5c38', // Bangladesh Green
      secondary: '#f23a3a', // Red
      background: '#f4f7f6',
      surface: '#ffffff',
      text: '#1f2937',
      textMuted: '#6b7280',
      border: '#e5e7eb',
      primaryLight: '#edf7f1',
      secondaryLight: '#fff0f0',
      heroBg: '#113a23',
    },
    space: {
      0: '0px',
      1: '8px',   // 8px base scale
      2: '16px',
      3: '24px',
      4: '32px',
      5: '40px',
      6: '48px',
      8: '64px',
      10: '80px',
      12: '96px',
    },
    fontSizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
    },
    fonts: {
      sans: 'Inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      mono: 'JetBrains Mono, monospace',
    },
    radii: {
      base: '8px',
      large: '12px',
      round: '9999px',
    },
    shadows: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      hover: '0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    },
  },
  media: {
    bp1: '(min-width: 640px)',
    bp2: '(min-width: 768px)',
    bp3: '(min-width: 1024px)',
  },
});

export const darkTheme = createTheme({
  colors: {
    background: '#121212',
    surface: '#1e1e1e',
    text: '#f3f4f6',
    textMuted: '#9ca3af',
    border: '#2e2e2e',
    primaryLight: '#183424',
    secondaryLight: '#3a1a1a',
    heroBg: '#0e261a',
  },
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.5)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.6), 0 2px 4px -1px rgba(0, 0, 0, 0.4)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -2px rgba(0, 0, 0, 0.5)',
    hover: '0 20px 25px -5px rgba(0, 0, 0, 0.8), 0 10px 10px -5px rgba(0, 0, 0, 0.6)',
  }
});
