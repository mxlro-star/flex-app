import { useColorScheme } from "react-native";
import { getTheme, Theme, defaultTheme } from "../constants/theme";

/**
 * Custom hook to access the current theme based on the device's color scheme
 *
 * Usage:
 * ```
 * const theme = useTheme();
 *
 * return (
 *   <View style={{ backgroundColor: theme.colors.background.primary }}>
 *     <Text style={{
 *       color: theme.colors.text.primary,
 *       fontFamily: theme.typography.fontWeights.medium,
 *       fontSize: theme.typography.fontSizes.md
 *     }}>
 *       Hello World
 *     </Text>
 *   </View>
 * );
 * ```
 */
export const useTheme = (): Theme => {
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === "dark";

  return getTheme(isDarkMode);
};

/**
 * Helper function to create styles with theme
 *
 * Usage:
 * ```
 * const styles = StyleSheet.create(
 *   createThemedStyles(theme => ({
 *     container: {
 *       backgroundColor: theme.colors.background.primary,
 *       padding: theme.spacing.md,
 *       borderRadius: theme.borderRadius.md,
 *     },
 *     text: {
 *       color: theme.colors.text.primary,
 *       fontFamily: theme.typography.fontWeights.medium,
 *       fontSize: theme.typography.fontSizes.md,
 *     }
 *   }))
 * );
 * ```
 */
export const createThemedStyles = <T extends Record<string, any>>(
  styleFactory: (theme: Theme) => T
): T => {
  // We use the default theme for type checking, but in components
  // this should be used with the useTheme() hook
  return styleFactory(defaultTheme);
};
