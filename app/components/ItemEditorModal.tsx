import React, { useEffect, useState } from "react";
import { Button, Modal, StyleSheet, Text, TextInput, View } from "react-native";

type Props = {
  isVisible: boolean;
  onDismiss: () => void;
  currentName: string;
  currentQuantity: number;
  saveChanges: (name: string, quantity: number) => void;
};

export default function ItemEditorModal({
  isVisible,
  onDismiss,
  currentName,
  currentQuantity,
  saveChanges,
}: Props) {
  const [itemLabel, setItemLabel] = useState(currentName);
  const [itemQty, setItemQty] = useState(String(currentQuantity));

  useEffect(() => {
    setItemLabel(currentName);
    setItemQty(String(currentQuantity));
  }, [currentName, currentQuantity, isVisible]);

  const handleSave = () => {
    const parsedQty = Math.max(1, parseInt(itemQty || "1", 10) || 1);
    saveChanges(itemLabel.trim(), parsedQty);
    onDismiss();
  };

  return (
    <Modal visible={isVisible} animationType="fade" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.heading}>Update Item</Text>
          <TextInput
            style={styles.inputField}
            value={itemLabel}
            onChangeText={setItemLabel}
            placeholder="Item name"
          />
          <TextInput
            style={styles.inputField}
            value={itemQty}
            onChangeText={setItemQty}
            keyboardType="numeric"
            placeholder="Quantity"
          />
          <View style={styles.buttonRow}>
            <Button title="Cancel" onPress={onDismiss} />
            <Button title="Save" onPress={handleSave} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(30,30,30,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "88%",
    backgroundColor: "#fafafa",
    padding: 20,
    borderRadius: 12,
    elevation: 5,
  },
  heading: {
    fontWeight: "600",
    fontSize: 17,
    marginBottom: 12,
    color: "#333",
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#bbb",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 8,
  },
});
