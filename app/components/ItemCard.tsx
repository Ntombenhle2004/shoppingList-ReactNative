import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import {
  deleteItem,
  togglePurchased,
  ShoppingItem as ItemType,
} from "../features/shoppingSlice";
import { useAppDispatch } from "../hooks";

type Props = {
  itemData: ItemType;
  onModify: (id: string) => void;
};

export default function ItemCard({ itemData, onModify }: Props) {
  const dispatch = useAppDispatch();

  const confirmDelete = () => {
    Alert.alert(
      "Delete Item",
      `Are you sure you want to remove "${itemData.name}"?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => dispatch(deleteItem(itemData.id)),
        },
      ]
    );
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => dispatch(togglePurchased(itemData.id))}
        accessibilityLabel={
          itemData.purchased ? "Unmark purchased" : "Mark purchased"
        }
        style={styles.checkbox}
      >
        <Ionicons
          name={itemData.purchased ? "checkbox-outline" : "square-outline"}
          size={24}
          color={itemData.purchased ? "#4f46e5" : "#333"}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, itemData.purchased && styles.done]}>
          {itemData.name}
        </Text>
        <Text style={styles.qtyText}>Quantity: {itemData.quantity}</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => onModify(itemData.id)}
          style={[styles.btn, styles.edit]}
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
          <Text style={styles.btnText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={confirmDelete}
          style={[styles.btn, styles.remove]}
        >
          <Ionicons name="trash-outline" size={18} color="#fff" />
          <Text style={styles.btnText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fdfdfd",
    marginHorizontal: 14,
    marginVertical: 6,
    padding: 12,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  checkbox: {
    marginRight: 14,
  },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: "500", color: "#222" },
  qtyText: { color: "#666", marginTop: 2 },
  done: { textDecorationLine: "line-through", color: "#999" },
  buttons: { flexDirection: "row", alignItems: "center" },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginLeft: 8,
  },
  edit: { backgroundColor: "#4f46e5" },
  remove: { backgroundColor: "#c62828" },
  btnText: { color: "#fff", fontWeight: "600", marginLeft: 4, fontSize: 13 },
});
