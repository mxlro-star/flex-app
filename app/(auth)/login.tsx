import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import { authService } from "../../services";
import { useTheme, createThemedStyles } from "../../hooks";

export default function Login() {
  const theme = useTheme();
  const styles = StyleSheet.create(
    createThemedStyles((theme) => ({
      container: {
        flex: 1,
        padding: theme.spacing.lg,
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
        marginTop: theme.spacing.md,
      },
      forgotPassword: {
        fontFamily: theme.typography.fontWeights.medium,
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.primary[500],
        textAlign: "right",
        marginTop: theme.spacing.sm,
        marginBottom: theme.spacing.lg,
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
      signUpText: {
        fontFamily: theme.typography.fontWeights.medium,
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.primary[500],
        marginTop: theme.spacing.xs,
      },
    }))
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter both email and password");
      return;
    }

    try {
      setIsLoading(true);
      await authService.signInWithEmailAndPassword(email, password);
      // Navigate to the main app after successful login
      router.replace("/(main)/(tabs)");
    } catch (error: any) {
      if (
        error.code === "auth/user-not-found" ||
        error.code === "auth/wrong-password"
      ) {
        Alert.alert("Login Failed", "Invalid email or password");
      } else if (error.code === "auth/too-many-requests") {
        Alert.alert("Login Failed", "Too many attempts. Try again later");
      } else {
        Alert.alert(
          "Login Failed",
          error.message || "Please check your credentials and try again"
        );
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    try {
      await authService.sendPasswordResetEmail(email);
      Alert.alert(
        "Password Reset",
        "Check your email for password reset instructions"
      );
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.message || "Failed to send password reset email"
      );
    }
  };

  const navigateToSignUp = () => {
    router.push("/(auth)/sign-up");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor={theme.colors.text.tertiary}
          value={email}
          onChangeText={setEmail}
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
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <Text style={styles.forgotPassword} onPress={handleForgotPassword}>
        Forgot Password?
      </Text>

      <View style={styles.buttonContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={theme.colors.primary[500]} />
        ) : (
          <Button
            title="Login"
            onPress={handleLogin}
            color={theme.colors.primary[500]}
          />
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <Text style={styles.signUpText} onPress={navigateToSignUp}>
          Sign Up
        </Text>
      </View>
    </SafeAreaView>
  );
}
