import { View, Text, Button } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "../../../context/auth";
import { useEffect } from "react";
export default function Tenants() {
  const router = useRouter();
  const { user, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/(auth)/login");
    }
  }, [isLoading, user]);

  if (isLoading) {
    return null;
  }

  return (
    <View>
      <Text>Tenants</Text>
    </View>
  );
}
