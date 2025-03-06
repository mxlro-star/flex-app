import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { authService } from "../../services";
import { useTheme, createThemedStyles } from "../../hooks";

export default function SignUp() {
  const theme = useTheme();
  const styles = StyleSheet.create(
    createThemedStyles((theme) => ({
      container: {
        flex: 1,
        padding: theme.spacing.lg,
      },
      scrollContainer: {
        flexGrow: 1,
      },
      title: {
        fontFamily: theme.typography.fontWeights.bold,
        fontSize: theme.typography.fontSizes.xxl,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.xl,
        textAlign: "center",
      },
      inputContainer: {
        marginBottom: theme.spacing.md,
      },
      input: {
        fontFamily: theme.typography.fontWeights.regular,
        fontSize: theme.typography.fontSizes.md,
        borderWidth: 1,
        borderColor: theme.colors.border.medium,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        backgroundColor: theme.colors.background.primary,
        color: theme.colors.text.primary,
      },
      buttonContainer: {
        marginTop: theme.spacing.lg,
      },
      footer: {
        marginTop: theme.spacing.xl,
        alignItems: "center",
      },
      footerText: {
        fontFamily: theme.typography.fontWeights.regular,
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.text.secondary,
      },
      loginText: {
        fontFamily: theme.typography.fontWeights.medium,
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.primary[500],
        marginTop: theme.spacing.xs,
      },
      errorText: {
        fontFamily: theme.typography.fontWeights.regular,
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.error[500],
        marginTop: theme.spacing.xs,
      },
    }))
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const validateForm = () => {
    setError("");

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields");
      return false;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSignUp = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setIsLoading(true);
      await authService.registerWithEmailAndPassword(email, password);
      Alert.alert("Success", "Account created successfully!", [
        { text: "OK", onPress: () => router.replace("/") },
      ]);
    } catch (error: any) {
      setError(error.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const navigateToLogin = () => {
    router.push("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Create Account</Text>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={theme.colors.text.tertiary}
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError("");
            }}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={theme.colors.text.tertiary}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              setError("");
            }}
            secureTextEntry
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor={theme.colors.text.tertiary}
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              setError("");
            }}
            secureTextEntry
          />
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <View style={styles.buttonContainer}>
          {isLoading ? (
            <ActivityIndicator size="large" color={theme.colors.primary[500]} />
          ) : (
            <Button
              title="Sign Up"
              onPress={handleSignUp}
              color={theme.colors.primary[500]}
            />
          )}
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account?</Text>
          <Text style={styles.loginText} onPress={navigateToLogin}>
            Login
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
