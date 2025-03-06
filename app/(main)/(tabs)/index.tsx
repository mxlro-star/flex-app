import { Text, View } from "react-native";
import { Link } from "expo-router";

export default function Home() {
  return (
    <View>
      <Text>Home</Text>
      <Link href="/">Go to landing page</Link>
      <Link href="/properties/1">Go to property 1</Link>
    </View>
  );
}
