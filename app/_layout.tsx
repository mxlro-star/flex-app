import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AuthProvider } from "../context/auth";
import { useAuth } from "../context/auth";
import { View, ActivityIndicator } from "react-native";
import { useTheme } from "../hooks";

SplashScreen.preventAutoHideAsync();

// Separate component for the actual layout to avoid auth check before fonts load
function AppNavigator() {
  const { user, isLoading: authLoading } = useAuth();
  const theme = useTheme();

  // Show loading indicator while checking auth
  if (authLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.colors.primary[500]} />
      </View>
    );
  }

  // Now we can determine the initial route based on auth state
  const initialRouteName = user ? "(main)/(tabs)" : "index";

  return (
    <Stack
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="(auth)/login" options={{ headerShown: true }} />
      <Stack.Screen name="(auth)/sign-up" options={{ headerShown: true }} />
      <Stack.Screen
        name="(auth)/forgot-password"
        options={{ headerShown: true }}
      />
      {/* Main section will handle its own headers */}
      <Stack.Screen name="(main)" options={{ headerShown: false }} />
      {/* Index screen for initial landing */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    "NotoSans-Regular": require("../assets/fonts/NotoSans-Regular.ttf"),
    "NotoSans-Medium": require("../assets/fonts/NotoSans-Medium.ttf"),
    "NotoSans-SemiBold": require("../assets/fonts/NotoSans-SemiBold.ttf"),
    "NotoSans-Bold": require("../assets/fonts/NotoSans-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <AuthProvider>
      <AppNavigator />
    </AuthProvider>
  );
}
