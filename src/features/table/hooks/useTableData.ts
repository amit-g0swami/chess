import { useEffect, useMemo, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addData, incrementPage } from "../../store/tableSlice";
import {
  selectTableData,
  selectPage,
  selectHasMore,
  selectFetchedPages,
} from "../../store/selectors";

export const useTableData = (tableId: string) => {
  const dispatch = useDispatch();
  const hasMounted = useRef(false); // Track if component has mounted

  const data = useSelector((state) => selectTableData(state, tableId));
  const page = useSelector((state) => selectPage(state, tableId));
  const hasMore = useSelector((state) => selectHasMore(state, tableId));
  const fetchedPages = useSelector((state) =>
    selectFetchedPages(state, tableId)
  );
  // Memoize fetchedPagesSet to avoid unnecessary recomputation
  const fetchedPagesSet = useMemo(() => new Set(fetchedPages), [fetchedPages]);

  useEffect(() => {
    if (fetchedPagesSet.has(page)) return; // Prevent duplicate fetch

    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulated delay

      const newData = Array.from({ length: 10 }, (_, index) => ({
        id: page * 10 + index,
        name: `Item ${page * 10 + index}`,
        price: (Math.random() * 100).toFixed(2),
        category: ["Electronics", "Clothing", "Books", "Home"][index % 4],
      }));

      dispatch(addData({ tableId, newData, page }));
    };

    fetchData();
  }, [page, fetchedPagesSet, tableId, dispatch]);

  const fetchMore = () => {
    if (!hasMounted.current) {
      hasMounted.current = true; // Mark that the first render has happened
      return; // Prevent fetchMore from being called initially
    }

    if (fetchedPagesSet.has(page + 1)) return; // Prevent duplicate fetch
    dispatch(incrementPage(tableId));
  };

  return { data, hasMore, fetchMore };
};
