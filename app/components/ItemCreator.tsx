import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { addItem } from "../features/shoppingSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import { RootState } from "../store";
import ItemEditorModal from "./ItemEditorModal";

export default function ItemCreator() {
  const dispatch = useAppDispatch();
  const itemCount = useAppSelector(
    (state: RootState) => state.shopping.items.length,
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  if (itemCount === 0) return null;

  return (
    <View style={styles.wrapper}>
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setIsModalVisible(true)}
      >
        
        <Text style={styles.buttonText}>Add New Item</Text>
      </TouchableOpacity>

      <ItemEditorModal
        isVisible={isModalVisible}
        onDismiss={() => setIsModalVisible(false)}
        currentName=""
        currentQuantity={1}
        saveChanges={(name, qty) => {
          if (name.trim()) {
            dispatch(addItem(name, qty));
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 14,
    backgroundColor: "#eef2f7",
    alignItems: "flex-end",
  },
  addButton: {
    backgroundColor: "#1F1F1F",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 6,
    alignItems: "center",
  
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 4,
  },
});