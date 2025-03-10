import { useRef, useCallback } from "react";

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
  const observer = useRef<IntersectionObserver | null>(null);
  const lastRowRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (!node || !hasMore) return;

      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            loadMore();
          }
        },
        { threshold: 1.0 }
      );

      observer.current.observe(node);
    },
    [loadMore, hasMore]
  );

  return (
    <div className="overflow-auto h-[500px]">
      {children}
      {hasMore && <div ref={lastRowRef} className="h-10" />}
    </div>
  );
};

export default TableWrapper;
