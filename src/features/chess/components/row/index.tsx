import { BOARD_LENGTH, COLOR, IRowProps } from "../../chess.interface";
import { Square } from "../square";

export const Row = ({
  rowId,
  boardState,
  isWhiteTurn,
  setIsWhiteTurn,
  setBoardState,
}: IRowProps) => {
  const columns = Array.from({ length: BOARD_LENGTH }, (_, i) => {
    const columnId = i + 1;
    const squareType = (rowId + columnId) % 2 === 0 ? COLOR.WHITE : COLOR.BLACK;
    return {
      squareType: squareType,
      columnId: columnId,
    };
  });

  return (
    <div className="row">
      {columns.map((column) => (
        <div className="column-container" key={column.columnId}>
          {rowId === 1 && (
            <div className={`${isWhiteTurn ? "rotate-white" : "rotate-black"}`}>
              C {column.columnId}
            </div>
          )}
          <Square
            rowId={rowId}
            boardState={boardState}
            columnId={column.columnId}
            isWhiteTurn={isWhiteTurn}
            squareType={column.squareType}
            setBoardState={setBoardState}
            setIsWhiteTurn={setIsWhiteTurn}
          />
        </div>
      ))}
    </div>
  );
};