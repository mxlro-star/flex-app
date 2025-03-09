import { Stack } from "expo-router";

export default function RootNavigator() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Auth group */}
      <Stack.Screen name="(auth)/login" options={{ headerShown: true }} />
      <Stack.Screen name="(auth)/sign-up" options={{ headerShown: true }} />
      <Stack.Screen
        name="(auth)/forgot-password"
        options={{ headerShown: true }}
      />
      <Stack.Screen name="(auth)/welcome" options={{ headerShown: false }} />

      {/* Main section */}
      <Stack.Screen name="(main)" options={{ headerShown: false }} />

      {/* Index screen */}
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
