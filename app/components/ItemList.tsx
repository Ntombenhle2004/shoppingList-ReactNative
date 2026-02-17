import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import {
  editItem,
  addItem,
  ShoppingItem as ItemType,
} from "../features/shoppingSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import type { RootState } from "../store";
import ItemEditorModal from "./ItemEditorModal";
import ItemCard from "./ItemCard";
import { Ionicons } from "@expo/vector-icons";

export default function ItemList() {
  const shoppingItems = useAppSelector(
    (state: RootState) => state.shopping.items,
  );
  const dispatch = useAppDispatch();
  const [currentEditId, setCurrentEditId] = useState<string | null>(null);
  const [isAddingFirst, setIsAddingFirst] = useState(false);

  const editingItem = useMemo(
    () => shoppingItems.find((i: ItemType) => i.id === currentEditId) ?? null,
    [shoppingItems, currentEditId],
  );

  // CENTERED EMPTY STATE
  if (shoppingItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <Ionicons name="cart-outline" size={50} color="black" />
        </View>
        <Text style={styles.emptyTitle}>No items yet</Text>
        <Text style={styles.emptySub}>Click add to start your list</Text>

        <TouchableOpacity
          style={styles.bigAddBtn}
          onPress={() => setIsAddingFirst(true)}
        >
          <Ionicons name="add" size={24} color="#fff" />
          <Text style={styles.bigAddBtnText}>Add Item</Text>
        </TouchableOpacity>

        <ItemEditorModal
          isVisible={isAddingFirst}
          onDismiss={() => setIsAddingFirst(false)}
          currentName=""
          currentQuantity={1}
          saveChanges={(name, qty) => dispatch(addItem(name, qty))}
        />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      <FlatList
        data={shoppingItems}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => (
          <ItemCard itemData={item} onModify={(id) => setCurrentEditId(id)} />
        )}
      />

      <ItemEditorModal
        isVisible={!!currentEditId}
        onDismiss={() => setCurrentEditId(null)}
        currentName={editingItem?.name ?? ""}
        currentQuantity={editingItem?.quantity ?? 1}
        saveChanges={(name, quantity) =>
          dispatch(editItem({ id: currentEditId!, name, quantity }))
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { flex: 1, backgroundColor: "#f1f3f6" },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f3f6",
    paddingBottom: 100,
  },
  emptyIconCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#e0e7ff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  emptyTitle: { fontSize: 22, fontWeight: "700", color: "#1e293b" },
  emptySub: { fontSize: 16, color: "#64748b", marginTop: 8, marginBottom: 30 },
  bigAddBtn: {
    backgroundColor: "#1F1F1F",
    flexDirection: "row",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    alignItems: "center",
    elevation: 5,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  bigAddBtnText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 18,
    marginLeft: 10,
  },
});