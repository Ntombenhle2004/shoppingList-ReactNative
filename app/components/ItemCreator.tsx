import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { addItem } from "../features/shoppingSlice";
import { useAppDispatch } from "../hooks";

export default function ItemCreator() {
  const dispatch = useAppDispatch();

  const [itemLabel, setItemLabel] = useState("");
  const [itemQty, setItemQty] = useState("1");
  const [errorMsg, setErrorMsg] = useState("");
  const [toastMsg, setToastMsg] = useState("");

  const handleCreateItem = () => {
    if (!itemLabel.trim()) {
      setErrorMsg("Item name cannot be empty.");
      return;
    }

    const parsedQty = Math.max(1, parseInt(itemQty, 10) || 1);

    dispatch(addItem(itemLabel.trim(), parsedQty));

    setItemLabel("");
    setItemQty("1");
    setErrorMsg("");
    setToastMsg(`"${itemLabel.trim()}" added`);

    setTimeout(() => setToastMsg(""), 1500);
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.panel}>
        <TextInput
          style={styles.input}
          placeholder="Enter item name"
          value={itemLabel}
          onChangeText={(text) => {
            setItemLabel(text);
            if (text.trim()) setErrorMsg("");
          }}
          accessibilityLabel="Shopping item name"
        />

        <Pressable
          onPress={handleCreateItem}
          accessibilityRole="button"
          accessibilityLabel="Create shopping item"
          testID="create-item-btn"
          style={({ pressed }) => [
            styles.actionBtn,
            pressed && styles.actionBtnPressed,
          ]}
        >
          <Ionicons name="add-circle-outline" size={22} color="#fff" />
          <Text style={styles.actionText}>Add</Text>
        </Pressable>
      </View>

      {errorMsg ? <Text style={styles.errorText}>{errorMsg}</Text> : null}

      {toastMsg ? (
        <View style={styles.toast} testID="toast">
          <Text style={styles.toastText}>{toastMsg}</Text>
        </View>
      ) : null}
    </View>
  );
}

/* ================= STYLES ================= */

const styles = StyleSheet.create({
  wrapper: {
    padding: 14,
    backgroundColor: "#f1f3f6",
  },
  panel: {
    backgroundColor: "#ffffff",
    borderRadius: 10,
    padding: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#dcdcdc",
    backgroundColor: "#fafafa",
    marginRight: 10,
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4f46e5",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
  },
  actionBtnPressed: {
    opacity: 0.8,
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 6,
  },
  errorText: {
    color: "#d11a2a",
    marginTop: 6,
    marginLeft: 4,
    fontSize: 13,
  },
  toast: {
    position: "absolute",
    left: 16,
    right: 16,
    bottom: 24,
    backgroundColor: "#4f46e5",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  toastText: {
    color: "#fff",
    fontWeight: "600",
  },
});
