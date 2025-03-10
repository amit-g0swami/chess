import "./index.css"; // Import CSS file
import useInView from "../hooks/useInView"; // Import the custom hook
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectScrollPosition } from "../../store/selectors";
import { setScrollPosition } from "../../store/tableSlice";

interface TableWrapperProps {
  tableId: string;
  children: React.ReactNode;
  hasMore: boolean;
  loadMore: () => void;
}

const TableWrapper: React.FC<TableWrapperProps> = ({
  tableId,
  children,
  hasMore,
  loadMore,
}) => {
  const dispatch = useDispatch();
  const tableWrapperRef = useRef<HTMLDivElement | null>(null);

  const lastRowRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useInView(lastRowRef);

  // Get stored scroll position from Redux
  const scrollPosition = useSelector((state) =>
    selectScrollPosition(state, tableId)
  );

  useEffect(() => {
    // Restore the scroll position from Redux when the component mounts
    if (tableWrapperRef.current && scrollPosition !== undefined) {
      tableWrapperRef.current.scrollTop = scrollPosition;
    }
  }, [scrollPosition]);

  useEffect(() => {
    if (tableWrapperRef.current) {
      const handleScroll = () => {
        if (tableWrapperRef.current) {
          // Dispatch scroll position to Redux on scroll
          dispatch(
            setScrollPosition({
              tableId,
              scrollPosition: tableWrapperRef.current.scrollTop,
            })
          );
        }
      };

      tableWrapperRef.current.addEventListener("scroll", handleScroll);
      return () => {
        tableWrapperRef.current?.removeEventListener("scroll", handleScroll);
      };
    }
  }, [dispatch, tableId]);

  React.useEffect(() => {
    if (isVisible && hasMore) {
      loadMore();
    }
  }, [isVisible, hasMore]);

  return (
    <div ref={tableWrapperRef} className="table-wrapper">
      {children}
      {hasMore && <div ref={lastRowRef} className="loader-placeholder" />}
    </div>
  );
};

export default TableWrapper;
