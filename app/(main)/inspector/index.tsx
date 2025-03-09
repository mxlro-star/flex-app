import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function Inspector() {
  return (
    <View>
      <Text>Inspector</Text>
      <Link href="/inspector/inspection-modal">Start Inspection</Link>
    </View>
  );
}
