import { createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";

export interface ListItem {
  id: string;
  title: string;
  amount: number;
  completed: boolean;
  timestamp: number;
}

export interface ListState {
  entries: ListItem[];
}

const initialState: ListState = {
  entries: [],
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    addItem: {
      reducer(state, action: PayloadAction<ListItem>) {
        state.entries.unshift(action.payload);
      },
      prepare(title: string, amount: number) {
        return {
          payload: {
            id: nanoid(),
            title,
            amount,
            completed: false,
            timestamp: Date.now(),
          } as ListItem,
        };
      },
    },

    updateItem(
      state,
      action: PayloadAction<{ id: string; title?: string; amount?: number }>
    ) {
      const target = state.entries.find((e) => e.id === action.payload.id);
      if (target) {
        if (action.payload.title !== undefined)
          target.title = action.payload.title;
        if (action.payload.amount !== undefined)
          target.amount = action.payload.amount;
      }
    },

    removeItem(state, action: PayloadAction<string>) {
      state.entries = state.entries.filter((e) => e.id !== action.payload);
    },

    toggleItemStatus(state, action: PayloadAction<string>) {
      const target = state.entries.find((e) => e.id === action.payload);
      if (target) target.completed = !target.completed;
    },

    resetList(state) {
      state.entries = [];
    },
  },
});

export const { addItem, updateItem, removeItem, toggleItemStatus, resetList } =
  listSlice.actions;

export default listSlice.reducer;
