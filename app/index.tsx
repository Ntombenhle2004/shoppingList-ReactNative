import React from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store";
import ItemCreator from "./components/ItemCreator";
import ItemList from "./components/ItemList";

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <SafeAreaView style={styles.screen}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Grocery Tracker</Text>
          </View>

          <ItemCreator />
          <ItemList />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#eef2f7",
  },
  header: {
    backgroundColor: "#334155",
    paddingVertical: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: 0.6,
  },
});
