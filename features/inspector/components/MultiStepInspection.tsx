import React from "react";
import { View, Text } from "react-native";
import { useInspection } from "../contexts/InspectionContext";
import InitialInfoStep from "./InitialInfoStep";
import DefineRoomStep from "./DefineRoomStep";
import CardStep from "./CardStep";

export default function MultiStepInspection() {
  const { step, data, nextStep, prevStep, updateData } = useInspection();

  return (
    <View>
      {step === 1 && (
        <InitialInfoStep nextStep={nextStep} updateData={updateData} />
      )}
      {step === 2 && (
        <DefineRoomStep
          nextStep={nextStep}
          prevStep={prevStep}
          updateData={updateData}
        />
      )}
      {step === 3 && (
        <CardStep
          nextStep={nextStep}
          prevStep={prevStep}
          updateData={updateData}
        />
      )}
    </View>
  );
}
