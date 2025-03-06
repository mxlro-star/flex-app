import { View, Text } from "react-native";
import { useLocalSearchParams, Link } from "expo-router";

export default function PropertyScreen() {
  const { id } = useLocalSearchParams();

  return (
    <View>
      <Text>Property {id}</Text>
      <Link href="/properties/2">Go to property 2</Link>
    </View>
  );
}
