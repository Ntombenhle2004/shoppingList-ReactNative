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
  },
  header: {
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 20,
    alignItems: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },
  headerTitle: {
    color: "#1F1F1F",
    fontSize: 28,
    fontWeight: "700",
    letterSpacing: -1,
  },
});