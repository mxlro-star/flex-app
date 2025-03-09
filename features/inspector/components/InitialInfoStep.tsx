import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import AddressFinder, { Address } from "../../../components/AddressFinder";
import { useTheme, createThemedStyles } from "../../../hooks";

// Define validation schema for the form
interface ValidationErrors {
  line_1?: string;
  post_town?: string;
  postcode?: string;
  [key: string]: string | undefined;
}

// Mock database call - in a real app, this would be a service call
const saveAddressToDatabase = async (
  address: Address
): Promise<{ success: boolean; id?: string; error?: string }> => {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate successful save (90% of the time)
  if (Math.random() > 0.1) {
    return {
      success: true,
      id: `addr_${Math.floor(Math.random() * 1000000)}`,
    };
  } else {
    // Simulate error (10% of the time)
    return {
      success: false,
      error: "Database connection error. Please try again.",
    };
  }
};

export default function InitialInfoStep({
  nextStep,
  updateData,
}: {
  nextStep: () => void;
  updateData: (data: any) => void;
}) {
  const theme = useTheme();
  const [address, setAddress] = useState<Address>({
    line_1: "",
    line_2: "",
    line_3: "",
    post_town: "",
    postcode: "",
    country: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const apiKey = process.env.EXPO_PUBLIC_IDEAL_POSTCODES_API_KEY;

  // Validate API key on component mount
  useEffect(() => {
    console.log("Using API key:", apiKey);

    // Check if API key is valid format (starts with ak_ and has sufficient length)
    if (!apiKey || !apiKey.startsWith("ak_") || apiKey.length < 10) {
      console.warn("API key appears to be invalid:", apiKey);
      Alert.alert(
        "API Key Issue",
        "The Ideal Postcodes API key may be invalid. Address search may not work correctly."
      );
    }
  }, [apiKey]);

  // Validate form data
  const validateForm = (): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    // Required fields
    if (!address.line_1.trim()) {
      newErrors.line_1 = "Address line 1 is required";
    }

    if (!address.post_town.trim()) {
      newErrors.post_town = "Town/City is required";
    }

    if (!address.postcode.trim()) {
      newErrors.postcode = "Postcode is required";
    } else if (
      !/^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/i.test(
        address.postcode.trim()
      )
    ) {
      newErrors.postcode = "Please enter a valid UK postcode";
    }

    return newErrors;
  };

  // Mark field as touched when user interacts with it
  const handleBlur = (field: keyof Address) => {
    setTouched((prev) => ({ ...prev, [field]: true }));

    // Validate the field on blur
    const fieldErrors = validateForm();
    setErrors(fieldErrors);
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      // Mark all fields as touched
      const allTouched = Object.keys(address).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setTouched(allTouched);

      // Validate the form
      const formErrors = validateForm();
      setErrors(formErrors);

      // Check if there are any errors
      if (Object.keys(formErrors).length > 0) {
        Alert.alert(
          "Validation Error",
          "Please fix the errors in the form before submitting."
        );
        return;
      }

      // Start submission process
      setIsSubmitting(true);

      // Normalize data before submission
      const normalizedAddress = {
        ...address,
        postcode: address.postcode.toUpperCase().replace(/\s+/g, " ").trim(),
        line_1: address.line_1.trim(),
        line_2: address.line_2.trim(),
        line_3: address.line_3.trim(),
        post_town: address.post_town.trim(),
        country: address.country || "United Kingdom",
      };

      // Make database call
      const result = await saveAddressToDatabase(normalizedAddress);

      if (result.success) {
        console.log("Address saved successfully with ID:", result.id);

        // Pass data to parent component
        updateData({
          ...normalizedAddress,
          id: result.id,
          timestamp: new Date().toISOString(),
          step: "next",
        });
        nextStep();
      } else {
        Alert.alert(
          "Error",
          result.error || "Failed to save address. Please try again."
        );
      }
    } catch (err) {
      console.error("Error submitting data:", err);
      Alert.alert("Error", "An unexpected error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle manual changes to address fields
  const handleAddressChange = (field: keyof Address, value: string) => {
    setAddress((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error for this field if it exists
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle address selection from AddressFinder
  const handleAddressSelected = (selectedAddress: Address) => {
    console.log("Address selected:", selectedAddress);
    setAddress(selectedAddress);

    // Clear all errors when an address is selected
    setErrors({});
  };

  const styles = StyleSheet.create(
    createThemedStyles((theme) => ({
      container: {
        padding: 16,
        backgroundColor: theme.colors.background.primary,
      },
      title: {
        fontFamily: "NotoSans-Bold",
        fontSize: 20,
        color: theme.colors.text.primary,
        marginBottom: 8,
      },
      subtitle: {
        fontFamily: "NotoSans-Medium",
        fontSize: 16,
        color: theme.colors.text.secondary,
        marginBottom: 16,
      },
      sectionTitle: {
        fontFamily: "NotoSans-SemiBold",
        fontSize: 18,
        color: theme.colors.text.primary,
        marginTop: 16,
        marginBottom: 8,
      },
      inputContainer: {
        marginBottom: 12,
      },
      label: {
        fontFamily: "NotoSans-Medium",
        fontSize: 14,
        color: theme.colors.text.secondary,
        marginBottom: 4,
      },
      input: {
        height: 48,
        borderWidth: 1,
        borderColor: theme.colors.border.medium,
        borderRadius: 8,
        padding: 12,
        fontFamily: "NotoSans-Regular",
        fontSize: 16,
        color: theme.colors.text.primary,
        backgroundColor: theme.colors.background.primary,
      },
      inputError: {
        borderColor: theme.colors.error[500],
      },
      errorText: {
        color: theme.colors.error[500],
        fontSize: 12,
        marginTop: 4,
        fontFamily: "NotoSans-Regular",
      },
      divider: {
        height: 1,
        backgroundColor: theme.colors.border.light,
        marginVertical: 16,
      },
      submitButton: {
        backgroundColor: theme.colors.primary[500],
        borderRadius: 8,
        padding: 16,
        alignItems: "center",
        marginTop: 24,
      },
      submitButtonText: {
        color: "#FFFFFF",
        fontFamily: "NotoSans-SemiBold",
        fontSize: 16,
      },
      disabledButton: {
        backgroundColor: theme.colors.gray[400],
      },
    }))
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Property Information</Text>
      <Text style={styles.subtitle}>
        Please provide the property address and details
      </Text>

      <Text style={styles.sectionTitle}>Property Address</Text>

      <AddressFinder
        apiKey={apiKey?.trim()}
        onAddressSelected={handleAddressSelected}
        placeholder="Start typing to find your address"
        showManualEntry={false}
      />

      <View style={styles.divider} />

      <Text style={styles.sectionTitle}>Address Details</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address Line 1 *</Text>
        <TextInput
          style={[
            styles.input,
            touched.line_1 && errors.line_1 ? styles.inputError : null,
          ]}
          value={address.line_1}
          onChangeText={(text) => handleAddressChange("line_1", text)}
          onBlur={() => handleBlur("line_1")}
          placeholder="House number and street"
          placeholderTextColor="#999"
        />
        {touched.line_1 && errors.line_1 && (
          <Text style={styles.errorText}>{errors.line_1}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Address Line 2</Text>
        <TextInput
          style={styles.input}
          value={address.line_2}
          onChangeText={(text) => handleAddressChange("line_2", text)}
          placeholder="Apartment, suite, unit, etc."
          placeholderTextColor="#999"
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Town/City *</Text>
        <TextInput
          style={[
            styles.input,
            touched.post_town && errors.post_town ? styles.inputError : null,
          ]}
          value={address.post_town}
          onChangeText={(text) => handleAddressChange("post_town", text)}
          onBlur={() => handleBlur("post_town")}
          placeholder="Town or city"
          placeholderTextColor="#999"
        />
        {touched.post_town && errors.post_town && (
          <Text style={styles.errorText}>{errors.post_town}</Text>
        )}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Postcode *</Text>
        <TextInput
          style={[
            styles.input,
            touched.postcode && errors.postcode ? styles.inputError : null,
          ]}
          value={address.postcode}
          onChangeText={(text) => handleAddressChange("postcode", text)}
          onBlur={() => handleBlur("postcode")}
          placeholder="Postcode"
          placeholderTextColor="#999"
        />
        {touched.postcode && errors.postcode && (
          <Text style={styles.errorText}>{errors.postcode}</Text>
        )}
      </View>

      <TouchableOpacity
        style={[
          styles.submitButton,
          isSubmitting ? styles.disabledButton : null,
        ]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.submitButtonText}>Submit</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}
