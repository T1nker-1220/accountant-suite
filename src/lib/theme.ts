/**
 * Theme configuration for the accounting suite
 * Defines color schemes, spacing, and other design tokens
 */

export const themeColors = {
  primary: {
    DEFAULT: '#4F46E5', // Indigo
    light: '#818CF8',
    dark: '#3730A3',
  },
  secondary: {
    DEFAULT: '#64748B', // Slate
    light: '#94A3B8',
    dark: '#475569',
  },
  accent: {
    DEFAULT: '#10B981', // Emerald
    light: '#34D399',
    dark: '#059669',
  },
  error: {
    DEFAULT: '#F43F5E', // Rose
    light: '#FB7185',
    dark: '#E11D48',
  },
  warning: {
    DEFAULT: '#F59E0B', // Amber
    light: '#FBBF24',
    dark: '#D97706',
  },
  success: {
    DEFAULT: '#22C55E', // Green
    light: '#4ADE80',
    dark: '#16A34A',
  },
  background: {
    DEFAULT: '#F8FAFC', // Slate-50
    dark: '#1E293B', // For future dark mode
  },
  text: {
    DEFAULT: '#1E293B', // Slate-800
    muted: '#64748B', // Slate-500
    light: '#F8FAFC', // For dark mode
  },
} as const;

// CSS Variables for theming
export const cssVariables = {
  colors: {
    '--primary': themeColors.primary.DEFAULT,
    '--primary-light': themeColors.primary.light,
    '--primary-dark': themeColors.primary.dark,
    '--secondary': themeColors.secondary.DEFAULT,
    '--secondary-light': themeColors.secondary.light,
    '--secondary-dark': themeColors.secondary.dark,
    '--accent': themeColors.accent.DEFAULT,
    '--accent-light': themeColors.accent.light,
    '--accent-dark': themeColors.accent.dark,
    '--error': themeColors.error.DEFAULT,
    '--error-light': themeColors.error.light,
    '--error-dark': themeColors.error.dark,
    '--warning': themeColors.warning.DEFAULT,
    '--warning-light': themeColors.warning.light,
    '--warning-dark': themeColors.warning.dark,
    '--success': themeColors.success.DEFAULT,
    '--success-light': themeColors.success.light,
    '--success-dark': themeColors.success.dark,
    '--background': themeColors.background.DEFAULT,
    '--background-dark': themeColors.background.dark,
    '--text': themeColors.text.DEFAULT,
    '--text-muted': themeColors.text.muted,
    '--text-light': themeColors.text.light,
  },
} as const;

// Future dark mode theme (commented out for now)
/*
export const darkTheme = {
  colors: {
    '--background': themeColors.background.dark,
    '--text': themeColors.text.light,
    // ... other dark mode variables
  },
} as const;
*/
