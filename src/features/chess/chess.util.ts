import {
  COLOR,
  IBoardState,
  IDetailsForOnDrop,
  IHandlePieceDrop,
  IHandleValidateTurn,
  IUpdateDraggedPiece,
  SameSqaureProps,
} from "./chess.interface";

const capturedPieces = (boardState: IBoardState[]) => {
  const capturedBlackPieces = [];
  const totalCapturedBlackPieces = capturedBlackPieces.length;
  const capturedWhitePieces = [];
  const totalCapturedWhitePieces = capturedWhitePieces.length;

  return {
    totalCapturedBlackPieces,
    capturedBlackPieces,
    totalCapturedWhitePieces,
    capturedWhitePieces,
  };
};

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

const isTheirAPieceOnDropSquare = ({
  rowId,
  columnId,
  boardState,
}: IDetailsForOnDrop) => {
  const findPiece = boardState.find(
    (piece) => piece.row === rowId && piece.column === columnId
  );

  return !!findPiece;
};

const updateDraggedPiece = ({
  state,
  draggedRow,
  draggedColumn,
  dropRow,
  dropColumn,
}: IUpdateDraggedPiece) =>
  state.map((piece) =>
    piece.row === draggedRow && piece.column === draggedColumn
      ? { ...piece, row: dropRow, column: dropColumn }
      : piece
  );

const handlePieceDrop = ({
  draggedData,
  onDropPayload,
  boardState,
}: IHandlePieceDrop) => {
  const { row: draggedRow, column: draggedColumn } = draggedData;
  const { row: dropRow, column: dropColumn } = onDropPayload;

  // Check if there's a piece on the drop square
  const isPieceOnDropSquare = isTheirAPieceOnDropSquare({
    rowId: dropRow,
    columnId: dropColumn,
    boardState,
  });

  if (isPieceOnDropSquare) {
    // Remove the piece on the drop square and update the dragged piece's position
    const boardStateWithoutDropPiece = boardState.filter(
      (piece) => piece.row !== dropRow || piece.column !== dropColumn
    );
    return updateDraggedPiece({
      state: boardStateWithoutDropPiece,
      draggedRow,
      draggedColumn,
      dropRow,
      dropColumn,
    });
  }

  // If no piece is on the drop square, just update the dragged piece's position
  return updateDraggedPiece({
    state: boardState,
    draggedRow,
    draggedColumn,
    dropRow,
    dropColumn,
  });
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
  updateDraggedPiece,
  handleValidateTurn,
  handlePieceDrop,
  capturedPieces,
  isValidMove,
};

export default chessUtil;
