import React, { forwardRef } from "react";
import {
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleSheet,
  View,
  Text,
  Platform,
  TouchableOpacity,
} from "react-native";
import { useTheme, createThemedStyles } from "../../hooks";

/**
 * Props for the TextInput component.
 * @extends RNTextInputProps - Extends React Native's TextInput props
 */
export interface TextInputProps extends RNTextInputProps {
  /** Label text to display above the input */
  label?: string;
  /** Error message to display below the input */
  error?: string;
  /** Helper text to display below the input */
  helperText?: string;
  /** Whether the input is in a loading state */
  isLoading?: boolean;
  /** Icon to display at the start of the input */
  startIcon?: React.ReactNode;
  /** Icon to display at the end of the input */
  endIcon?: React.ReactNode;
  /** Callback when the end icon is pressed */
  onEndIconPress?: () => void;
  /** Whether the input is disabled */
  disabled?: boolean;
  /** Whether the input takes up the full width of its container */
  fullWidth?: boolean;
  /** Custom container style */
  containerStyle?: object;
}

/**
 * A customizable TextInput component that follows platform-specific design guidelines.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <TextInput
 *   label="Email"
 *   placeholder="Enter your email"
 *   keyboardType="email-address"
 *   autoCapitalize="none"
 * />
 *
 * // With error state
 * <TextInput
 *   label="Password"
 *   placeholder="Enter your password"
 *   secureTextEntry
 *   error="Password must be at least 8 characters"
 * />
 *
 * // With helper text
 * <TextInput
 *   label="Username"
 *   helperText="Choose a unique username"
 * />
 * ```
 */
const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      label,
      error,
      helperText,
      isLoading,
      startIcon,
      endIcon,
      onEndIconPress,
      disabled,
      fullWidth = true,
      containerStyle,
      style,
      placeholderTextColor,
      ...rest
    },
    ref
  ) => {
    const theme = useTheme();
    const styles = StyleSheet.create(
      createThemedStyles((theme) => ({
        container: {
          width: fullWidth ? "100%" : "auto",
          marginBottom: theme.spacing.sm,
          opacity: disabled ? 0.6 : 1,
          ...containerStyle,
        },
        labelText: {
          fontFamily: "NotoSans-Medium",
          fontSize: theme.typography.fontSizes.sm,
          color: theme.colors.text.primary,
          marginBottom: theme.spacing.xs,
        },
        inputContainer: {
          flexDirection: "row",
          alignItems: "center",
          borderWidth: 1,
          borderColor: error
            ? theme.colors.error[500]
            : theme.colors.border.medium,
          borderRadius: theme.borderRadius.md,
          backgroundColor: theme.colors.background.primary,
          paddingHorizontal: theme.spacing.sm,
          minHeight: Platform.OS === "ios" ? 44 : 48,
        },
        input: {
          flex: 1,
          fontFamily: "NotoSans-Regular",
          fontSize: theme.typography.fontSizes.md,
          color: theme.colors.text.primary,
          paddingVertical:
            Platform.OS === "ios" ? theme.spacing.sm : theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
        },
        iconContainer: {
          paddingHorizontal: theme.spacing.xs,
        },
        helperText: {
          fontFamily: "NotoSans-Regular",
          fontSize: theme.typography.fontSizes.xs,
          color: theme.colors.text.secondary,
          marginTop: theme.spacing.xs,
        },
        errorText: {
          fontFamily: "NotoSans-Regular",
          fontSize: theme.typography.fontSizes.xs,
          color: theme.colors.error[500],
          marginTop: theme.spacing.xs,
        },
      }))
    );

    return (
      <View style={styles.container}>
        {label && <Text style={styles.labelText}>{label}</Text>}

        <View style={styles.inputContainer}>
          {startIcon && <View style={styles.iconContainer}>{startIcon}</View>}

          <RNTextInput
            ref={ref}
            style={[styles.input, style]}
            placeholderTextColor={
              placeholderTextColor || theme.colors.text.tertiary
            }
            editable={!disabled && !isLoading}
            {...rest}
          />

          {endIcon && (
            <TouchableOpacity
              style={styles.iconContainer}
              onPress={onEndIconPress}
              disabled={disabled || !onEndIconPress}
            >
              {endIcon}
            </TouchableOpacity>
          )}
        </View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : helperText ? (
          <Text style={styles.helperText}>{helperText}</Text>
        ) : null}
      </View>
    );
  }
);

export default TextInput;
