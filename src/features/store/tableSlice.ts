import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TableState {
  data: Record<string, unknown[]>; // Stores data per table
  page: Record<string, number>;
  hasMore: Record<string, boolean>;
  fetchedPages: Record<string, number[]>; // Use an array instead of a Set
  scrollPosition: Record<string, number>; // Track scroll position per table
}

const initialState: TableState = {
  data: {},
  page: {},
  hasMore: {},
  fetchedPages: {},
  scrollPosition: {}, // Initialize scroll position
};

const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {
    addData: (
      state,
      action: PayloadAction<{
        tableId: string;
        newData: unknown[];
        page: number;
      }>
    ) => {
      const { tableId, newData, page } = action.payload;

      if (!state.fetchedPages[tableId]) {
        state.fetchedPages[tableId] = [];
      }

      if (state.fetchedPages[tableId].includes(page)) return;

      state.fetchedPages[tableId].push(page); // Store pages as an array
      state.data[tableId] = [...(state.data[tableId] || []), ...newData];
      state.hasMore[tableId] = newData.length > 0;
    },
    incrementPage: (state, action: PayloadAction<string>) => {
      const tableId = action.payload;
      state.page[tableId] = (state.page[tableId] || 1) + 1;
    },
    setScrollPosition: (
      state,
      action: PayloadAction<{ tableId: string; scrollPosition: number }>
    ) => {
      const { tableId, scrollPosition } = action.payload;
      state.scrollPosition[tableId] = scrollPosition;
    },
  },
});

export const { addData, incrementPage, setScrollPosition } = tableSlice.actions;
export default tableSlice.reducer;
