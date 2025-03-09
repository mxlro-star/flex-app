// AddressFinder Component for React Native
// Based on Ideal Postcodes API: https://docs.ideal-postcodes.co.uk/docs/address-finder/react

import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useTheme, createThemedStyles } from "../hooks";

/**
 * Address interface representing a UK address structure
 */
export interface Address {
  /** First line of the address (typically house number and street) */
  line_1: string;
  /** Second line of the address (optional, e.g., apartment, suite) */
  line_2: string;
  /** Third line of the address (optional, additional information) */
  line_3: string;
  /** Town or city */
  post_town: string;
  /** UK postcode */
  postcode: string;
  /** Country name */
  country: string;
  /** Additional fields can be added as needed */
  [key: string]: string;
}

/**
 * Props for the AddressFinder component
 */
interface AddressFinderProps {
  /** Your Ideal Postcodes API key */
  apiKey: string | undefined;
  /** Callback function that receives the selected address */
  onAddressSelected: (address: Address) => void;
  /** Placeholder text for the search input */
  placeholder?: string;
  /** Whether to show manual entry option */
  showManualEntry?: boolean;
}

/**
 * AddressFinder component for React Native
 * Uses the Ideal Postcodes API to search for and retrieve UK addresses
 */
const AddressFinder: React.FC<AddressFinderProps> = ({
  apiKey,
  onAddressSelected,
  placeholder = "Search for your address",
  showManualEntry = true,
}) => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [addresses, setAddresses] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle search as user types
  useEffect(() => {
    if (searchText.length < 3) {
      setAddresses([]);
      setShowResults(false);
      return;
    }

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Set a new timeout to debounce the search
    searchTimeoutRef.current = setTimeout(() => {
      handleSearch();
    }, 300);

    // Cleanup function
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchText]);

  // Search for addresses using the Ideal Postcodes API
  const handleSearch = async () => {
    if (!apiKey || !searchText.trim()) return;

    setIsLoading(true);
    setAddresses([]);

    try {
      console.log(
        `Searching addresses with query: "${searchText}" and API key: ${apiKey.substring(
          0,
          5
        )}...`
      );

      // Call the Ideal Postcodes autocomplete API
      const response = await fetch(
        `https://api.ideal-postcodes.co.uk/v1/autocomplete/addresses?api_key=${apiKey}&query=${encodeURIComponent(
          searchText
        )}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // Log the response status
      console.log(`Address search response status: ${response.status}`);

      // Get the response as text first for logging
      const responseText = await response.text();
      console.log(`Response body: ${responseText.substring(0, 200)}...`); // Log first 200 chars to avoid huge logs

      // Try to parse the response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        return;
      }

      if (data.result && Array.isArray(data.result.hits)) {
        console.log(`Found ${data.result.hits.length} address matches`);
        setAddresses(data.result.hits);
        setShowResults(true);
      } else {
        console.log("No address matches found or invalid response format");
        setAddresses([]);
      }
    } catch (error) {
      console.error("Error searching addresses:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Retrieve full address details by ID
  const handleSelectAddress = async (id: string) => {
    if (!apiKey) return;

    setIsLoading(true);
    Keyboard.dismiss();

    try {
      console.log(`Retrieving address with ID: ${id}`);

      // Extract the UDPRN from the ID
      // The ID format is "paf_UDPRN" (e.g., "paf_16869234")
      const udprnMatch = id.match(/paf_(\d+)/);
      if (!udprnMatch || !udprnMatch[1]) {
        console.error("Could not extract UDPRN from ID:", id);
        return;
      }

      const udprn = udprnMatch[1];
      console.log(`Extracted UDPRN: ${udprn}`);

      // Call the correct Ideal Postcodes API endpoint for retrieving address by UDPRN
      // According to the docs, we should use /v1/udprn/{udprn}
      const response = await fetch(
        `https://api.ideal-postcodes.co.uk/v1/udprn/${udprn}?api_key=${apiKey}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );

      // Log the full response for debugging
      console.log(`Address retrieval response status: ${response.status}`);

      const responseText = await response.text();
      console.log(`Response body: ${responseText.substring(0, 200)}...`); // Log first 200 chars

      // Try to parse the response as JSON
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (parseError) {
        console.error("Error parsing response:", parseError);
        return;
      }

      // Check if we have a valid result
      if (data && data.result) {
        console.log("Successfully retrieved address:", data.result);

        const address: Address = {
          line_1: data.result.line_1 || "",
          line_2: data.result.line_2 || "",
          line_3: data.result.line_3 || "",
          post_town: data.result.post_town || "",
          postcode: data.result.postcode || "",
          country: data.result.country || "United Kingdom",
        };

        onAddressSelected(address);
        setSearchText("");
        setAddresses([]);
        setShowResults(false);
      } else {
        console.error("Invalid response format or missing result:", data);
      }
    } catch (error) {
      console.error("Error retrieving address:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Render an address suggestion item
  const renderAddressItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.resultItem}
      onPress={() => handleSelectAddress(item.id)}
    >
      <Text style={styles.resultText}>{item.suggestion || item.address}</Text>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create(
    createThemedStyles((theme) => ({
      container: {
        marginBottom: theme.spacing.md,
      },
      inputContainer: {
        position: "relative",
      },
      input: {
        borderWidth: 1,
        borderColor: theme.colors.border.medium,
        borderRadius: theme.borderRadius.md,
        padding: theme.spacing.md,
        fontFamily: "NotoSans-Regular",
        fontSize: theme.typography.fontSizes.md,
        color: theme.colors.text.primary,
        backgroundColor: theme.colors.background.primary,
      },
      resultsContainer: {
        maxHeight: 200,
        borderWidth: 1,
        borderColor: theme.colors.border.light,
        borderRadius: theme.borderRadius.md,
        backgroundColor: theme.colors.background.primary,
        marginTop: theme.spacing.xs,
        zIndex: 10,
      },
      resultItem: {
        padding: theme.spacing.md,
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.border.light,
      },
      resultText: {
        fontFamily: "NotoSans-Regular",
        fontSize: theme.typography.fontSizes.md,
        color: theme.colors.text.primary,
      },
      loadingContainer: {
        position: "absolute",
        right: theme.spacing.md,
        top: 0,
        bottom: 0,
        justifyContent: "center",
      },
      manualEntryText: {
        fontFamily: "NotoSans-Medium",
        fontSize: theme.typography.fontSizes.sm,
        color: theme.colors.primary[500],
        textAlign: "right",
        marginTop: theme.spacing.sm,
      },
    }))
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.text.tertiary}
          onFocus={() => searchText.length >= 3 && setShowResults(true)}
          onBlur={() => setTimeout(() => setShowResults(false), 200)}
        />
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color={theme.colors.primary[500]} />
          </View>
        )}
      </View>

      {showResults && addresses.length > 0 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={addresses}
            renderItem={renderAddressItem}
            keyExtractor={(item) => item.id}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      )}

      {showManualEntry && (
        <TouchableOpacity
          onPress={() => {
            setSearchText("");
            setAddresses([]);
            setShowResults(false);
            onAddressSelected({
              line_1: "",
              line_2: "",
              line_3: "",
              post_town: "",
              postcode: "",
              country: "United Kingdom",
            });
          }}
        >
          <Text style={styles.manualEntryText}>Enter address manually</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default AddressFinder;
