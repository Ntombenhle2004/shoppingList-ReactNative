import React, { useMemo, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { editItem, ShoppingItem as ItemType } from "../features/shoppingSlice";
import { useAppDispatch, useAppSelector } from "../hooks";
import type { RootState } from "../store";
import ItemEditorModal from "./ItemEditorModal";
import ItemCard from "./ItemCard";

export default function ItemList() {
  const shoppingItems = useAppSelector(
    (state: RootState) => state.shopping.items
  );
  const dispatch = useAppDispatch();

  const [currentEditId, setCurrentEditId] = useState<string | null>(null);

  const editingItem = useMemo(
    () => shoppingItems.find((i: ItemType) => i.id === currentEditId) ?? null,
    [shoppingItems, currentEditId]
  );

  return (
    <View style={styles.wrapper}>
      {shoppingItems.length === 0 ? (
        <Text style={styles.emptyMsg}>
          Your shopping list is empty. Add some items above!
        </Text>
      ) : (
        <FlatList
          data={shoppingItems}
          keyExtractor={(i) => i.id}
          contentContainerStyle={{ paddingBottom: 140 }}
          renderItem={({ item }) => (
            <ItemCard itemData={item} onModify={(id) => setCurrentEditId(id)} />
          )}
          ListFooterComponent={() => (
            <View style={styles.footer}>
              <Text style={styles.footerText}>
                Swipe left or press delete to remove items
              </Text>
            </View>
          )}
        />
      )}

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
  emptyMsg: { textAlign: "center", marginTop: 28, color: "#555", fontSize: 15 },
  footer: { padding: 16, alignItems: "center" },
  footerText: { color: "#888", fontSize: 13 },
});
