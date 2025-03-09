import React from "react";
import { View, Text } from "react-native";

export default function CardStep({
  nextStep,
  prevStep,
  updateData,
}: {
  nextStep: () => void;
  prevStep: () => void;
  updateData: (data: any) => void;
}) {
  return (
    <View>
      <Text>Card Step</Text>
    </View>
  );
}
