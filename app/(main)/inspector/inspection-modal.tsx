import React, { useState } from "react";
import { View, Text } from "react-native";
import InitialInfoStep from "@/features/inspector/components/InitialInfoStep";
import DefineRoomStep from "@/features/inspector/components/DefineRoomStep";
import CardStep from "@/features/inspector/components/CardStep";
import { InspectionProvider } from "@/features/inspector/contexts/InspectionContext";
import MultiStepInspection from "@/features/inspector/components/MultiStepInspection";

export default function Inspection() {
  // const [step, setStep] = useState<number>(1);
  // const [dataFromStep1, setDataFromStep1] = useState<any>({});

  // const handleDataFromStep1 = (data: any) => {
  //   setDataFromStep1(data);
  // };
  // if (dataFromStep1.step === "next") {
  //   setStep((prev) => prev + 1);
  // }

  return (
    <InspectionProvider>
      <MultiStepInspection />
    </InspectionProvider>
  );
}
