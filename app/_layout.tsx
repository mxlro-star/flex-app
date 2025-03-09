import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { AuthProvider } from "../contexts/auth";
import RootNavigator from "../navigation/RootNavigator";

SplashScreen.preventAutoHideAsync();

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
      <RootNavigator />
    </AuthProvider>
  );
}
