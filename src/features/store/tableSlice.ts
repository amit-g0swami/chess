import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableState {
  data: Record<string, unknown[]>; // Stores data per table
  page: Record<string, number>;
  hasMore: Record<string, boolean>;
}

const initialState: TableState = {
  data: {},
  page: {},
  hasMore: {},
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addData: (
      state,
      action: PayloadAction<{ tableId: string; newData: unknown[] }>
    ) => {
      const { tableId, newData } = action.payload;
      state.data[tableId] = [...(state.data[tableId] || []), ...newData];
      state.hasMore[tableId] = newData.length > 0;
    },
    incrementPage: (state, action: PayloadAction<string>) => {
      const tableId = action.payload;
      state.page[tableId] = (state.page[tableId] || 1) + 1;
    },
  },
});

export const { addData, incrementPage } = tableSlice.actions;
export default tableSlice.reducer;
