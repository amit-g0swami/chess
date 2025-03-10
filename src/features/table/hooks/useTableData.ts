import { useEffect, useState } from "react";

export const useTableData = (tableId: string) => {
  const [data, setData] = useState<Record<string, unknown[]>>({});
  const [page, setPage] = useState<Record<string, number>>({});
  const [hasMore, setHasMore] = useState<Record<string, boolean>>({});
  const fetchedPages = new Set<number>(); // Keeps track of already fetched pages

  useEffect(() => {
    const currentPage = page[tableId] || 1;
    
    // Prevent fetching if data for this page is already available
    if (fetchedPages.has(currentPage)) return;
    
    fetchedPages.add(currentPage); // Mark page as fetched

    const fetchData = async () => {
      // Simulated delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Dummy data for testing
      const newData = Array.from({ length: 10 }, (_, index) => ({
        id: currentPage * 10 + index,
        name: `Item ${currentPage * 10 + index}`,
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
    const nextPage = (page[tableId] || 1) + 1;

    // Prevent fetching if data for this page is already available
    if (fetchedPages.has(nextPage)) return;

    setPage((prev) => ({
      ...prev,
      [tableId]: nextPage,
    }));
  };

  return {
    data: data[tableId] || [],
    hasMore: hasMore[tableId] ?? true,
    fetchMore,
  };
};
