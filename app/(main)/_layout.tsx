import { Stack, Redirect } from "expo-router";
import { useAuth } from "../../contexts/auth";
import { View, ActivityIndicator } from "react-native";
import { useTheme } from "../../hooks";

export default function Layout() {
  const { user, isLoading } = useAuth();
  const theme = useTheme();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
      </View>
    );
  }

  if (!user) {
    return <Redirect href="/(auth)/welcome" />;
  }

  return (
    <Stack initialRouteName="(tabs)">
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen
        name="inspector/inspection-modal"
        options={{
          presentation: "modal",
          presentationStyle: "pageSheet",
        }}
      />
    </Stack>
  );
}
