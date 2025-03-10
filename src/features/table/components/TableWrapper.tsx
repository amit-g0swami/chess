import React, { useRef } from "react";
import useInView from "../hooks/useInView"; // Import the custom hook
import "./index.css"; // Import CSS file

interface TableWrapperProps {
  children: React.ReactNode;
  hasMore: boolean;
  loadMore: () => void;
}

const TableWrapper: React.FC<TableWrapperProps> = ({
  children,
  hasMore,
  loadMore,
}) => {
  const lastRowRef = useRef<HTMLDivElement | null>(null);
  const isVisible = useInView(lastRowRef);

  React.useEffect(() => {
    if (isVisible && hasMore) {
      loadMore();
    }
  }, [isVisible, hasMore]);

  return (
    <div className="table-wrapper">
      {children}
      {hasMore && <div ref={lastRowRef} className="loader-placeholder" />}
    </div>
  );
};

export default TableWrapper;
