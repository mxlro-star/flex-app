import { View, Text, Button } from "react-native";
import { authService } from "../../../services";

export default function Profile() {
  const handleSignOut = async () => {
    await authService.signOut();
  };
  return (
    <View>
      <Text>Profile</Text>
      <Button title="Sign Out" onPress={handleSignOut} />
    </View>
  );
}
