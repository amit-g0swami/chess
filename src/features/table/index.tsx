import { ReactNode } from "react";
import { useTableData } from "./hooks/useTableData";
import Table from "./components/Table";
import TableWrapper from "./components/TableWrapper";

export const TableComponent = () => {
  const tableId = "table";
  const { data, hasMore, fetchMore } = useTableData(tableId);

  return (
    <TableWrapper loadMore={fetchMore} hasMore={hasMore}>
      <Table data={data as Record<string, ReactNode>[]} />
    </TableWrapper>
  );
};
