import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShoppingItem {
  id: string;
  name: string;
  quantity: number;
  purchased: boolean;
}

interface ShoppingState {
  items: ShoppingItem[];
}

const initialState: ShoppingState = {
  items: [],
};

const shoppingSlice = createSlice({
  name: "shopping",
  initialState,
  reducers: {
    addItem: {
      reducer: (state, action: PayloadAction<ShoppingItem>) => {
        state.items.push(action.payload);
      },
      prepare: (name: string, quantity: number) => ({
        payload: {
          id: Date.now().toString(), 
          name,
          quantity,
          purchased: false,
        },
      }),
    },
    editItem: (
      state,
      action: PayloadAction<{ id: string; name: string; quantity: number }>,
    ) => {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) {
        item.name = action.payload.name;
        item.quantity = action.payload.quantity;
      }
    },
    deleteItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    togglePurchased: (state, action: PayloadAction<string>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.purchased = !item.purchased;
    },
  },
});

export const { addItem, editItem, deleteItem, togglePurchased } =
  shoppingSlice.actions;
export default shoppingSlice.reducer;