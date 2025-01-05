import chessUtil from "../../chess.util";
import { SETDATA_KEY } from "../../chess.const.ts";
import { COLOR, IBoardState } from "../../chess.interface";
import { Piece } from "../piece";

interface ISquareProps {
  squareType: COLOR;
  columnId: number;
  rowId: number;
  boardState: IBoardState[];
  isWhiteTurn: boolean;
  setBoardState: (boardState: IBoardState[]) => void;
  setIsWhiteTurn: (isWhiteTurn: boolean) => void;
}

export const Square = ({
  squareType,
  columnId,
  rowId,
  boardState,
  isWhiteTurn,
  setIsWhiteTurn,
  setBoardState,
}: ISquareProps) => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    piece: IBoardState
  ) => {
    const draggedPayload: IBoardState = {
      id: piece.id,
      row: piece.row,
      column: piece.column,
      color: piece.color,
      type: piece.type,
    };

    const isTurnValid = chessUtil.handleValidateTurn({
      draggedData: piece,
      isWhiteTurn,
    });

    if (!isTurnValid) {
      e.preventDefault();
      return;
    }

    e.dataTransfer.setData(SETDATA_KEY, JSON.stringify(draggedPayload));
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const getData = e.dataTransfer.getData(SETDATA_KEY);
    const draggedData: IBoardState = JSON.parse(getData);

    const { pieceType, color } = chessUtil.onDroppedSquareDetail({
      rowId,
      columnId,
      boardState,
    });

    const onDropPayload = {
      row: rowId,
      column: columnId,
      color: color,
      pieceType: pieceType,
    };

    const isValid = chessUtil.isValidMove({
      draggedData,
      onDropPayload,
      boardState,
    });

    if (!isValid) return;

    const updatedBoardState = chessUtil.handlePieceDrop({
      draggedData,
      onDropPayload,
      boardState,
    });

    setBoardState(updatedBoardState);
    setIsWhiteTurn(!isWhiteTurn);
  };

  return (
    <div
      className={`square ${
        squareType === COLOR.WHITE ? "white-square" : "black-square"
      }`}
      onDrop={(e) => onDrop(e)}
      onDragOver={(e) => onDragOver(e)}
    >
      <span className="color-red hidden">{rowId + columnId}</span>
      {boardState.map((piece, index) => {
        if (piece.row === rowId && piece.column === columnId) {
          const color = piece.color;
          return (
            <div
              key={index}
              draggable
              onDragStart={(e) => onDragStart(e, piece)}
              className={`piece ${
                color === COLOR.WHITE ? "white-piece" : "black-piece"
              } ${isWhiteTurn ? "rotate-white" : "rotate-black"}`}
            >
              <Piece pieceType={piece.type} />
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};
