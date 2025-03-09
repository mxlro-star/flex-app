import { View, Text, Button } from "react-native";
import { authService } from "../../../services";
import { router } from "expo-router";

export default function Profile() {
  const handleSignOut = async () => {
    await authService.signOut();
    // Explicitly navigate to index after signing out
    router.replace("/");
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
