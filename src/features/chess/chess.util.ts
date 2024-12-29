import {
  COLOR,
  IDetailsForOnDrop,
  IHandlePieceDrop,
  IHandleValidateTurn,
  SameSqaureProps,
} from "./chess.interface";

const onDroppedSquareDetail = ({
  rowId,
  columnId,
  boardState,
}: IDetailsForOnDrop) => {
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

const handlePieceDrop = ({
  draggedData,
  onDropPayload,
  boardState,
}: IHandlePieceDrop) => {
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

const handleValidateTurn = ({
  draggedData,
  isWhiteTurn,
}: IHandleValidateTurn) => {
  switch (draggedData.color) {
    case COLOR.WHITE:
      return isWhiteTurn;
    case COLOR.BLACK:
      return !isWhiteTurn;
    default:
      return false;
  }
};

// MOVE VALIDATION FUNCTIONS

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
}: IHandlePieceDrop) => {
  // check if the dropped piece is not the same as the dragged piece
  if (droppedSquareSameAsDraggedSquare({ draggedData, onDropPayload })) {
    return false;
  }

  return true;
};

const chessUtil = {
  onDroppedSquareDetail,
  handlePieceDrop,
  handleValidateTurn,
  isValidMove,
};

export default chessUtil;
