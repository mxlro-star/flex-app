import React from "react";
import { View, Text } from "react-native";

export default function DefineRoomStep({
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
      <Text>Define Room Step</Text>
    </View>
  );
}
