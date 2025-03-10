import { ReactNode, useMemo } from "react";
import { useTableData } from "./hooks/useTableData";
import Table from "./components/Table";
import TableWrapper from "./components/TableWrapper";

export const TableComponent = () => {
  const tableId = "table";
  const { data, hasMore, fetchMore } = useTableData(tableId);

  // Memoize the data to avoid unnecessary re-renders
  const memoizedData = useMemo(() => data, [data]);

  return (
    <TableWrapper loadMore={fetchMore} hasMore={hasMore}>
      <Table data={memoizedData as Record<string, ReactNode>[]} />
    </TableWrapper>
  );
};
