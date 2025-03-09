import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  tooltipOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  tooltipContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    maxWidth: "80%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tooltipText: {
    fontSize: 14,
    color: "#333",
  },
  infoIcon: {
    marginLeft: 8,
    color: "#007AFF",
  },
});

export default function InfoTooltip({ text }: { text: string }) {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <TouchableOpacity onPress={() => setVisible(true)}>
        <Text style={styles.infoIcon}>ⓘ</Text>
      </TouchableOpacity>

      <Modal
        transparent
        visible={visible}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <TouchableOpacity
          style={styles.tooltipOverlay}
          activeOpacity={1}
          onPress={() => setVisible(false)}
        >
          <View style={styles.tooltipContainer}>
            <Text style={styles.tooltipText}>{text}</Text>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}
