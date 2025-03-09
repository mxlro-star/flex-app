import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define your context types
interface InspectionContextType {
  step: number;
  data: any;
  nextStep: () => void;
  prevStep: () => void;
  updateData: (newData: any) => void;
  resetInspection: () => void;
}

const InspectionContext = createContext<InspectionContextType | undefined>(
  undefined
);

export const InspectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [step, setStep] = useState<number>(1);
  const [data, setData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  // Load saved state on initial mount
  useEffect(() => {
    const loadSavedState = async () => {
      try {
        const savedStep = await AsyncStorage.getItem("inspection_step");
        const savedData = await AsyncStorage.getItem("inspection_data");

        if (savedStep) setStep(parseInt(savedStep));
        if (savedData) setData(JSON.parse(savedData));
      } catch (error) {
        console.error("Error loading saved inspection state:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSavedState();
  }, []);

  // Save state whenever it changes
  useEffect(() => {
    const saveState = async () => {
      try {
        await AsyncStorage.setItem("inspection_step", step.toString());
        await AsyncStorage.setItem("inspection_data", JSON.stringify(data));
      } catch (error) {
        console.error("Error saving inspection state:", error);
      }
    };

    if (!isLoading) {
      saveState();
    }
  }, [step, data, isLoading]);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => Math.max(1, prev - 1));

  const updateData = (newData: any) => {
    setData((prevData: any) => ({
      ...prevData,
      ...newData,
    }));
  };

  const resetInspection = async () => {
    setStep(1);
    setData({});
    try {
      await AsyncStorage.removeItem("inspection_step");
      await AsyncStorage.removeItem("inspection_data");
    } catch (error) {
      console.error("Error clearing saved inspection:", error);
    }
  };

  if (isLoading) {
    // Return a loading state or null
    return null; // Or a loading spinner
  }

  return (
    <InspectionContext.Provider
      value={{
        step,
        data,
        nextStep,
        prevStep,
        updateData,
        resetInspection,
      }}
    >
      {children}
    </InspectionContext.Provider>
  );
};

export const useInspection = () => {
  const context = useContext(InspectionContext);
  if (context === undefined) {
    throw new Error("useInspection must be used within an InspectionProvider");
  }
  return context;
};
