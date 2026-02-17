import React, { useEffect, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

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
    if (isVisible) {
      setItemLabel(currentName);
      setItemQty(String(currentQuantity));
    }
  }, [currentName, currentQuantity, isVisible]);

const handleSave = () => {
  if (!itemLabel.trim()) return;
  const finalQty = Math.max(1, parseInt(itemQty, 10) || 1);
  saveChanges(itemLabel.trim(), finalQty);
  onDismiss();
};

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalBox}>
          <Text style={styles.heading}>
            {currentName ? "Edit Item" : "New Item"}
          </Text>

          <Text style={styles.label}>Item Name</Text>
          <TextInput
            style={styles.inputField}
            value={itemLabel}
            onChangeText={setItemLabel}
            placeholder="e.g. Milk"
            placeholderTextColor={"#CCCCCC"}
            autoFocus={true}
          />

          <Text style={styles.label}>Quantity</Text>
          <TextInput
            style={styles.inputField}
            value={itemQty}
            onChangeText={(val) => setItemQty(val.replace(/[^0-9]/g, ""))} // Only numbers
            keyboardType="number-pad"
            placeholder="1"
          />

          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.cancelBtn} onPress={onDismiss}>
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.saveBtn,
                !itemLabel.trim() && { backgroundColor: "#ccc" },
              ]}
              onPress={handleSave}
              disabled={!itemLabel.trim()}
            >
              <Text style={styles.saveText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 20,
    elevation: 10,
  },
  heading: {
    fontWeight: "800",
    fontSize: 20,
    marginBottom: 20,
    color: "#1e293b",
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#64748b",
    marginBottom: 6,
    marginLeft: 4,
  },
  inputField: {
    borderWidth: 1,
    borderColor: "#e2e8f0",
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
    backgroundColor: "#f8fafc",
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  cancelBtn: {
    flex: 1,
    padding: 14,
    alignItems: "center",
  },
  saveBtn: {
    flex: 1,
    backgroundColor: "black",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  disabledBtn: {
    backgroundColor: "#a5a6f6",
  },
  cancelText: { color: "red", fontWeight: "600" },
  saveText: { color: "#fff", fontWeight: "700" },
});