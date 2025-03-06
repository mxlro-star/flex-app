import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { useTheme, createThemedStyles } from "../hooks";

export default function Index() {
  const theme = useTheme();

  const styles = StyleSheet.create(
    createThemedStyles((theme) => ({
      container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing.lg,
        backgroundColor: theme.colors.background.primary,
      },
      title: {
        fontFamily: theme.typography.fontWeights.bold,
        fontSize: theme.typography.fontSizes.xxl,
        color: theme.colors.text.primary,
        marginBottom: theme.spacing.md,
        textAlign: "center",
      },
      subtitle: {
        fontFamily: theme.typography.fontWeights.regular,
        fontSize: theme.typography.fontSizes.md,
        color: theme.colors.text.secondary,
        marginBottom: theme.spacing.xl,
        textAlign: "center",
      },
      linkContainer: {
        marginTop: theme.spacing.md,
      },
      link: {
        fontFamily: theme.typography.fontWeights.medium,
        fontSize: theme.typography.fontSizes.md,
        color: theme.colors.primary[500],
        padding: theme.spacing.md,
        marginVertical: theme.spacing.xs,
      },
    }))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Flex App</Text>
      <Text style={styles.subtitle}>
        Please sign in or create an account to continue
      </Text>
      <View style={styles.linkContainer}>
        <Link href="/(auth)/sign-up" style={styles.link}>
          Sign Up
        </Link>
        <Link href="/(auth)/login" style={styles.link}>
          Already have an account? Login
        </Link>
      </View>
    </View>
  );
}
