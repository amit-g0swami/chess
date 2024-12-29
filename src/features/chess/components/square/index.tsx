import {
  COLOR,
  IBoardState,
  IdetailsForOnDrop,
  IhandlePieceDrop,
  IhandleValidateTurn,
  ISquareProps,
  SameSqaureProps,
  SETDATA_KEY,
} from "../../chess.interface";
import { Piece } from "../piece";

const onDroppedSquareDetail = ({
  rowId,
  columnId,
  boardState,
}: IdetailsForOnDrop) => {
  const findPiece = boardState.find(
    (piece) => piece.row === rowId && piece.column === columnId
  );

  if (findPiece) {
    const { type, color } = findPiece;
    return { pieceType: type, color };
  }

  return {
    pieceType: null,
    color: null,
  };
};

const handleValidateTurn = ({
  draggedData,
  isWhiteTurn,
}: IhandleValidateTurn) => {
  switch (draggedData.color) {
    case COLOR.WHITE:
      return isWhiteTurn;
    case COLOR.BLACK:
      return !isWhiteTurn;
    default:
      return false;
  }
};

const droppedSquareSameAsDraggedSquare = ({
  draggedData,
  onDropPayload,
}: SameSqaureProps) => {
  const { row: draggedRow, column: draggedColumn } = draggedData;
  const { row: dropRow, column: dropColumn } = onDropPayload;
  const isSameSquare = draggedRow === dropRow && draggedColumn === dropColumn;
  return isSameSquare;
};

const isValidMove = ({
  draggedData,
  onDropPayload,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  boardState,
}: IhandlePieceDrop) => {
  // check if the dropped piece is not the same as the dragged piece
  if (droppedSquareSameAsDraggedSquare({ draggedData, onDropPayload })) {
    return false;
  }

  return true;
};

const handlePieceDrop = ({
  draggedData,
  onDropPayload,
  boardState,
}: IhandlePieceDrop) => {
  const { row: draggedRow, column: draggedColumn } = draggedData;
  const { row: dropRow, column: dropColumn } = onDropPayload;

  const updatedBoardState = boardState.map((piece) => {
    if (piece.row === draggedRow && piece.column === draggedColumn) {
      piece.row = dropRow;
      piece.column = dropColumn;
    }
    return piece;
  });

  return updatedBoardState;
};

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
    const draggedPayload = {
      row: piece.row,
      column: piece.column,
      color: piece.color,
      pieceType: piece.type,
    };

    const isTurnValid = handleValidateTurn({
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
    const draggedData = JSON.parse(getData);

    const { pieceType, color } = onDroppedSquareDetail({
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

    const isValid = isValidMove({
      draggedData,
      onDropPayload,
      boardState,
    });

    if (!isValid) {
      return;
    }

    const updatedBoardState = handlePieceDrop({
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
