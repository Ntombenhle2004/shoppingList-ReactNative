import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { store } from "./store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadLists } from "../features/list/listsSlice";

const Loader = ({ children }: any) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem("SHOPPING_LISTS");
      if (data) dispatch(loadLists(JSON.parse(data)));
    };
    load();
  }, []);

  return children;
};

export default function App() {
  return (
    <Provider store={store}>
      <Loader>{/* Navigation here */}</Loader>
    </Provider>
  );
}
