import { useEffect, useState } from "react";

export const useTableData = (tableId: string) => {
  const [data, setData] = useState<Record<string, unknown[]>>({});
  const [page, setPage] = useState<Record<string, number>>({});
  const [hasMore, setHasMore] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchData = async () => {
      // Simulated delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Dummy data for testing
      const newData = Array.from({ length: 10 }, (_, index) => ({
        id: (page[tableId] || 1) * 10 + index,
        name: `Item ${(page[tableId] || 1) * 10 + index}`,
        price: (Math.random() * 100).toFixed(2),
        category: ["Electronics", "Clothing", "Books", "Home"][index % 4],
      }));

      setData((prev) => ({
        ...prev,
        [tableId]: [...(prev[tableId] || []), ...newData],
      }));

      setHasMore((prev) => ({
        ...prev,
        [tableId]: newData.length > 0, // Simulating infinite data
      }));
    };

    fetchData();
  }, [page, tableId]);

  const fetchMore = () => {
    if (hasMore[tableId]) {
      setPage((prev) => ({
        ...prev,
        [tableId]: (prev[tableId] || 1) + 1,
      }));
    }
  };

  return {
    data: data[tableId] || [],
    hasMore: hasMore[tableId] ?? true,
    fetchMore,
  };
};
