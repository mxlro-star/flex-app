/**
 * Color palette for the Flex App
 * These colors are designed for an enterprise dashboard SaaS application
 * with support for both light and dark modes.
 */

// Primary brand colors
export const brandColors = {
  primary: {
    50: "#E6F1FF",
    100: "#CCE4FF",
    200: "#99C9FF",
    300: "#66ADFF",
    400: "#3392FF",
    500: "#0077FF", // Main brand color
    600: "#005FCC",
    700: "#004799",
    800: "#003066",
    900: "#001833",
  },
  secondary: {
    50: "#F0F7F7",
    100: "#E1EFEF",
    200: "#C3DFDF",
    300: "#A5CFCF",
    400: "#87BFBF",
    500: "#69AFAF", // Secondary brand color
    600: "#548C8C",
    700: "#3F6969",
    800: "#2A4646",
    900: "#152323",
  },
  accent: {
    50: "#FFF1E6",
    100: "#FFE3CC",
    200: "#FFC799",
    300: "#FFAB66",
    400: "#FF8F33",
    500: "#FF7300", // Accent color for CTAs and highlights
    600: "#CC5C00",
    700: "#994500",
    800: "#662E00",
    900: "#331700",
  },
};

// Neutral colors
export const neutralColors = {
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
    950: "#0A0F1A",
  },
};

// Semantic colors for feedback
export const semanticColors = {
  success: {
    50: "#ECFDF5",
    100: "#D1FAE5",
    500: "#10B981",
    700: "#047857",
    900: "#064E3B",
  },
  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    500: "#F59E0B",
    700: "#B45309",
    900: "#78350F",
  },
  error: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    500: "#EF4444",
    700: "#B91C1C",
    900: "#7F1D1D",
  },
  info: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    500: "#3B82F6",
    700: "#1D4ED8",
    900: "#1E3A8A",
  },
};

// Theme-specific colors
export const lightThemeColors = {
  background: {
    primary: "#FFFFFF",
    secondary: neutralColors.gray[50],
    tertiary: neutralColors.gray[100],
  },
  text: {
    primary: neutralColors.gray[900],
    secondary: neutralColors.gray[600],
    tertiary: neutralColors.gray[500],
    inverse: "#FFFFFF",
  },
  border: {
    light: neutralColors.gray[200],
    medium: neutralColors.gray[300],
    dark: neutralColors.gray[400],
  },
  shadow: {
    light: "rgba(0, 0, 0, 0.05)",
    medium: "rgba(0, 0, 0, 0.1)",
    dark: "rgba(0, 0, 0, 0.2)",
  },
};

export const darkThemeColors = {
  background: {
    primary: neutralColors.gray[900],
    secondary: neutralColors.gray[800],
    tertiary: neutralColors.gray[700],
  },
  text: {
    primary: "#FFFFFF",
    secondary: neutralColors.gray[300],
    tertiary: neutralColors.gray[400],
    inverse: neutralColors.gray[900],
  },
  border: {
    light: neutralColors.gray[700],
    medium: neutralColors.gray[600],
    dark: neutralColors.gray[500],
  },
  shadow: {
    light: "rgba(0, 0, 0, 0.3)",
    medium: "rgba(0, 0, 0, 0.5)",
    dark: "rgba(0, 0, 0, 0.7)",
  },
};
