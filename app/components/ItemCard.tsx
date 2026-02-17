import React from "react";
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from "react-native";
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

  const handleDelete = () => {
    if (Platform.OS === "web") {
      const confirmWeb = window.confirm(
        `Are you sure you want to remove "${itemData.name}"?`,
      );
      if (confirmWeb) {
        dispatch(deleteItem(itemData.id));
      }
    } else {
      Alert.alert("Delete Item", `Remove "${itemData.name}"?`, [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => dispatch(deleteItem(itemData.id)),
        },
      ]);
    }
  };

  return (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => dispatch(togglePurchased(itemData.id))}
        style={styles.checkbox}
      >
        <Ionicons
          name={itemData.purchased ? "checkbox" : "square-outline"}
          size={24}
          color={itemData.purchased ? "#1F1F1F" : "#333"}
        />
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={[styles.title, itemData.purchased && styles.done]}>
          {itemData.name}
        </Text>
        <Text style={styles.qtyText}>Qty: {itemData.quantity}</Text>
      </View>

      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={() => onModify(itemData.id)}
          style={[styles.btn, styles.edit]}
        >
          <Ionicons name="create-outline" size={18} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleDelete}
          style={[styles.btn, styles.remove]}
        >
          <Ionicons name="trash-outline" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    marginHorizontal: 14,
    marginVertical: 6,
    padding: 12,
    borderRadius: 12,
    elevation: 3,
    shadowColor: "#1F1F1F",
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  checkbox: { marginRight: 12 },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: "600", color: "#1e293b" },
  qtyText: { color: "#64748b", fontSize: 13 },
  done: { textDecorationLine: "line-through", color: "#94a3b8" },
  buttons: { flexDirection: "row" },
  btn: { padding: 8, borderRadius: 8, marginLeft: 8 },
  edit: { backgroundColor: "#1F1F1F" },
  remove: { backgroundColor: "#f77676" },
});