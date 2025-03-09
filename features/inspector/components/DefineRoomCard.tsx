import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Animated,
  Easing,
  ActivityIndicator,
} from "react-native";
import InfoTooltip from "../../../components/InfoToolTip";

interface ErrorState {
  roomName?: string;
  roomType?: string;
  roomDimensions?: string;
  [key: string]: string | undefined;
}

const DefineRoomCard = () => {
  //   const { updateRoomCompletion } = useContext(InspectionContext);

  // Use refs for tracking component state
  const isMounted = useRef(true);
  const isToggling = useRef(false);
  const animationRef = useRef<Animated.CompositeAnimation | null>(null);

  // Use useRef for animated values
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Component state
  const [expanded, setExpanded] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomType, setRoomType] = useState("");
  const [roomDimensions, setRoomDimensions] = useState("");
  const [errors, setErrors] = useState<ErrorState>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  // Add logging for component lifecycle
  useEffect(() => {
    console.log("[DefineRoomCard] Component mounted");
    isMounted.current = true;

    return () => {
      console.log("[DefineRoomCard] Component unmounted - cleaning up");
      isMounted.current = false;

      // Clean up any ongoing animations
      if (animationRef.current) {
        animationRef.current.stop();
      }
      progressAnim.stopAnimation();
    };
  }, []);

  // Log state changes
  useEffect(() => {
    console.log("[DefineRoomCard] Expanded state changed:", expanded);
  }, [expanded]);

  // Simplified toggle without LayoutAnimation
  const toggleExpand = () => {
    try {
      console.log(
        "[DefineRoomCard] Attempting to toggle expand. Current state:",
        expanded
      );

      // Prevent rapid toggling
      if (isToggling.current) {
        console.log(
          "[DefineRoomCard] Toggle operation in progress, ignoring request"
        );
        return;
      }

      isToggling.current = true;

      // Simply toggle the state without animation
      if (isMounted.current) {
        setExpanded(!expanded);
      }

      // Reset toggle lock after a short delay
      setTimeout(() => {
        if (isMounted.current) {
          isToggling.current = false;
        }
      }, 300);

      console.log("[DefineRoomCard] Toggle expand completed successfully");
    } catch (error) {
      console.error("[DefineRoomCard] Error in toggleExpand:", error);
      isToggling.current = false;
    }
  };

  const validateInputs = () => {
    try {
      console.log("[DefineRoomCard] Validating inputs");
      let valid = true;
      let newErrors: ErrorState = {};

      if (!roomName.trim()) {
        newErrors.roomName = "Room name is required.";
        valid = false;
      }

      if (!roomType.trim()) {
        newErrors.roomType = "Room type is required.";
        valid = false;
      }

      if (!roomDimensions.trim()) {
        newErrors.roomDimensions = "Room dimensions are required.";
        valid = false;
      }

      if (isMounted.current) {
        setErrors(newErrors);
      }

      console.log(
        "[DefineRoomCard] Validation result:",
        valid,
        "Errors:",
        newErrors
      );
      return valid;
    } catch (error) {
      console.error("[DefineRoomCard] Error in validateInputs:", error);
      return false;
    }
  };

  const handleSave = async () => {
    try {
      console.log("[DefineRoomCard] Starting save process");

      if (!validateInputs()) {
        console.log("[DefineRoomCard] Validation failed, aborting save");
        return;
      }

      if (isMounted.current) {
        setIsSaving(true);
      }

      console.log("[DefineRoomCard] Saving room data:", {
        roomName,
        roomType,
        roomDimensions,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Update progress animation safely
      if (isMounted.current) {
        // Cancel any existing animation
        if (animationRef.current) {
          animationRef.current.stop();
        }

        // Create and store new animation
        animationRef.current = Animated.timing(progressAnim, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: false,
        });

        // Start animation
        animationRef.current.start();
      }

      if (isMounted.current) {
        setSaved(true);
        setIsSaving(false);
      }

      console.log("[DefineRoomCard] Save completed successfully");
    } catch (error) {
      console.error("[DefineRoomCard] Error in handleSave:", error);
      if (isMounted.current) {
        setIsSaving(false);
      }
    }
  };

  const renderProgressBar = () => {
    try {
      const width = progressAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
      });

      return (
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, { width }]} />
        </View>
      );
    } catch (error) {
      console.error("[DefineRoomCard] Error in renderProgressBar:", error);
      return null;
    }
  };

  // Wrap the render method in a try-catch to catch any rendering errors
  try {
    // Use a simplified render approach
    return (
      <View style={styles.card}>
        {/* Header is always visible */}
        <TouchableOpacity
          onPress={toggleExpand}
          style={styles.header}
          disabled={isToggling.current}
        >
          <Text style={styles.title}>Define Room</Text>
          <Text style={styles.expandIcon}>{expanded ? "▲" : "▼"}</Text>
        </TouchableOpacity>

        {/* Progress bar if saved */}
        {saved && renderProgressBar()}

        {/* Content area - conditionally rendered */}
        {expanded ? (
          <View style={styles.content}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Room Name</Text>
              <TextInput
                style={styles.input}
                value={roomName}
                onChangeText={(text) => setRoomName(text)}
                placeholder="e.g., Living Room"
              />
              {errors.roomName && (
                <Text style={styles.errorText}>{errors.roomName}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Room Type</Text>
              <TextInput
                style={styles.input}
                value={roomType}
                onChangeText={(text) => setRoomType(text)}
                placeholder="e.g., Common Area"
              />
              {errors.roomType && (
                <Text style={styles.errorText}>{errors.roomType}</Text>
              )}
            </View>

            <View style={styles.inputGroup}>
              <View style={styles.labelRow}>
                <Text style={styles.label}>Room Dimensions</Text>
                <InfoTooltip text="Enter dimensions in square feet" />
              </View>
              <TextInput
                style={styles.input}
                value={roomDimensions}
                onChangeText={(text) => setRoomDimensions(text)}
                placeholder="e.g., 12x15"
                keyboardType="numbers-and-punctuation"
              />
              {errors.roomDimensions && (
                <Text style={styles.errorText}>{errors.roomDimensions}</Text>
              )}
            </View>

            <TouchableOpacity
              style={[styles.saveButton, isSaving && styles.savingButton]}
              onPress={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text style={styles.saveButtonText}>
                  {saved ? "Update Room" : "Save Room"}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
    );
  } catch (error) {
    console.error("[DefineRoomCard] Render error:", error);
    // Fallback UI in case of render error
    return (
      <View style={styles.card}>
        <Text style={styles.errorText}>
          Error rendering room card. Please check console for details.
        </Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  title: {
    fontSize: 18,
    fontWeight: "600",
  },
  expandIcon: {
    fontSize: 16,
  },
  content: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "500",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 4,
    padding: 12,
    fontSize: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginTop: 4,
  },
  saveButton: {
    backgroundColor: "#007AFF",
    borderRadius: 4,
    padding: 14,
    alignItems: "center",
    marginTop: 8,
  },
  savingButton: {
    opacity: 0.7,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  progressContainer: {
    height: 4,
    backgroundColor: "#f0f0f0",
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#4CD964",
  },
});

export default DefineRoomCard;
