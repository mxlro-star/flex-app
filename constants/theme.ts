import {
  brandColors,
  neutralColors,
  semanticColors,
  lightThemeColors,
  darkThemeColors,
} from "./colors";

/**
 * Theme configuration for the Flex App
 * This theme is designed for an enterprise dashboard SaaS application
 * with support for both light and dark modes.
 */

// Spacing scale (in pixels)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
  xxxl: 64,
};

// Border radius scale (in pixels)
export const borderRadius = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  round: 9999,
};

// Typography scale
export const typography = {
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 32,
    display: 40,
  },
  fontWeights: {
    regular: "NotoSans-Regular",
    medium: "NotoSans-Medium",
    semiBold: "NotoSans-SemiBold",
    bold: "NotoSans-Bold",
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
};

// Elevation/Shadow styles
export const elevation = {
  light: {
    small: {
      shadowColor: lightThemeColors.shadow.light,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: lightThemeColors.shadow.medium,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: lightThemeColors.shadow.dark,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  dark: {
    small: {
      shadowColor: darkThemeColors.shadow.light,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 1,
      shadowRadius: 2,
      elevation: 2,
    },
    medium: {
      shadowColor: darkThemeColors.shadow.medium,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 1,
      shadowRadius: 4,
      elevation: 4,
    },
    large: {
      shadowColor: darkThemeColors.shadow.dark,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 8,
    },
  },
};

// Animation timing
export const animation = {
  durations: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easings: {
    easeInOut: "ease-in-out",
    easeOut: "ease-out",
    easeIn: "ease-in",
    linear: "linear",
  },
};

// Light theme
export const lightTheme = {
  colors: {
    ...brandColors,
    ...neutralColors,
    ...semanticColors,
    ...lightThemeColors,
  },
  spacing,
  borderRadius,
  typography,
  elevation: elevation.light,
  animation,
  isDark: false,
};

// Dark theme
export const darkTheme = {
  colors: {
    ...brandColors,
    ...neutralColors,
    ...semanticColors,
    ...darkThemeColors,
  },
  spacing,
  borderRadius,
  typography,
  elevation: elevation.dark,
  animation,
  isDark: true,
};

// Default theme
export const defaultTheme = lightTheme;

// Theme type
export type Theme = typeof lightTheme;

// Helper function to get the current theme
export const getTheme = (isDarkMode: boolean): Theme => {
  return isDarkMode ? darkTheme : lightTheme;
};
