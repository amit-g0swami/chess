import { createSelector } from "reselect";
import { RootState } from "../store";

const selectTableState = (state: RootState) => state.table;

export const selectTableData = createSelector(
  [selectTableState, (_, tableId: string) => tableId],
  (table, tableId) => table.data[tableId] || []
);

export const selectPage = createSelector(
  [selectTableState, (_, tableId: string) => tableId],
  (table, tableId) => table.page[tableId] || 1
);

export const selectHasMore = createSelector(
  [selectTableState, (_, tableId: string) => tableId],
  (table, tableId) => table.hasMore[tableId] ?? true
);

export const selectFetchedPages = createSelector(
  [selectTableState, (_, tableId: string) => tableId],
  (table, tableId) => table.fetchedPages[tableId] || []
);

export const selectScrollPosition = createSelector(
  [selectTableState, (_, tableId: string) => tableId],
  (table, tableId) => table.scrollPosition[tableId] || 0
);
