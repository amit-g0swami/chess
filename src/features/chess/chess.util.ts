/* eslint-disable @typescript-eslint/no-unused-vars */
import { INITIAL_BOARD_STATE } from "./chess.const";
import {
  COLOR,
  IBoardState,
  IDetailsForOnDrop,
  IHandlePieceDrop,
  IHandleValidateTurn,
  IUpdateDraggedPiece,
  PIECE_TYPE,
  ValidateMoveProps,
} from "./chess.interface";

const capturedPieces = (
  boardState: IBoardState[]
): {
  capturedBlackPieces: IBoardState[];
  capturedWhitePieces: IBoardState[];
} => {
  if (boardState.length === INITIAL_BOARD_STATE.length) {
    return { capturedBlackPieces: [], capturedWhitePieces: [] };
  }

  const capturedPieces = INITIAL_BOARD_STATE.filter(
    (initialPiece) => !boardState.some((piece) => piece.id === initialPiece.id)
  );

  const capturedWhitePieces = capturedPieces.filter(
    (piece) => piece.color === COLOR.WHITE
  );
  const capturedBlackPieces = capturedPieces.filter(
    (piece) => piece.color === COLOR.BLACK
  );

  return {
    capturedWhitePieces,
    capturedBlackPieces,
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

const isDroppedSquareSameAsDraggedSquare = ({
  draggedData,
  onDropPayload,
}: ValidateMoveProps) => {
  const { row: draggedRow, column: draggedColumn } = draggedData;
  const { row: dropRow, column: dropColumn } = onDropPayload;
  const isSameSquare = draggedRow === dropRow && draggedColumn === dropColumn;
  return isSameSquare;
};

const isDroppedSquareTypeSameAsDraggedSquare = ({
  draggedData,
  onDropPayload,
}: ValidateMoveProps) => {
  const { color: draggedPieceType } = draggedData;
  const { color: droppedPieceType } = onDropPayload;
  const isSamePieceType = draggedPieceType === droppedPieceType;
  return isSamePieceType;
};

const isPawnMoveValid = ({
  draggedData,
  onDropPayload,
  boardState,
}: IHandlePieceDrop) => {
  const { row: draggedRow, column: draggedColumn } = draggedData;
  const { row: dropRow, column: dropColumn } = onDropPayload;

  const isSameColumn = draggedColumn === dropColumn;

  const isWhitePawnMove = draggedData.color === COLOR.WHITE;
  const isBlackPawnMove = draggedData.color === COLOR.BLACK;

  const isWhitePawnMoveValid =
    isWhitePawnMove && dropRow === draggedRow + 1 && isSameColumn;
  const isBlackPawnMoveValid =
    isBlackPawnMove && dropRow === draggedRow - 1 && isSameColumn;

  if (isWhitePawnMoveValid || isBlackPawnMoveValid) {
    return true;
  }

  return false;
};

const isBishopMoveBlocked = ({
  draggedData,
  onDropPayload,
  boardState,
}: IHandlePieceDrop) => {
  const { row: draggedRow, column: draggedColumn } = draggedData;
  const { row: dropRow, column: dropColumn } = onDropPayload;

  const rowDiff = Math.abs(draggedRow - dropRow);
  const columnDiff = Math.abs(draggedColumn - dropColumn);

  // Check for diagonal move
  if (rowDiff === columnDiff) {
    const rowStep = draggedRow < dropRow ? 1 : -1;
    const columnStep = draggedColumn < dropColumn ? 1 : -1;

    // Check for blocking pieces
    let currentRow = draggedRow + rowStep;
    let currentColumn = draggedColumn + columnStep;

    while (currentRow !== dropRow && currentColumn !== dropColumn) {
      if (
        boardState.some(
          (piece) => piece.row === currentRow && piece.column === currentColumn
        )
      ) {
        return true; // Path is blocked
      }
      currentRow += rowStep;
      currentColumn += columnStep;
    }
    return false;
  }

  return false;
};

const isRookMoveValid = ({
  draggedData,
  onDropPayload,
  boardState,
}: IHandlePieceDrop) => {
  const { row: draggedRow, column: draggedColumn } = draggedData;
  const { row: dropRow, column: dropColumn } = onDropPayload;

  const isSameRow = draggedRow === dropRow;
  const isSameColumn = draggedColumn === dropColumn;

  if (isSameRow || isSameColumn) {
    return !isRookMoveBlocked({ draggedData, onDropPayload, boardState });
  }

  return false;
};

const isKnightMoveValid = ({
  draggedData,
  onDropPayload,
}: IHandlePieceDrop) => {
  const { row: draggedRow, column: draggedColumn } = draggedData;
  const { row: dropRow, column: dropColumn } = onDropPayload;

  const rowDiff = Math.abs(draggedRow - dropRow);
  const columnDiff = Math.abs(draggedColumn - dropColumn);

  // Knight moves in an "L" shape
  return (
    (rowDiff === 2 && columnDiff === 1) || (rowDiff === 1 && columnDiff === 2)
  );
};

const isRookMoveBlocked = ({
  draggedData,
  onDropPayload,
  boardState,
}: IHandlePieceDrop) => {
  const { row: draggedRow, column: draggedColumn } = draggedData;
  const { row: dropRow, column: dropColumn } = onDropPayload;

  const isSameRow = draggedRow === dropRow;
  const isSameColumn = draggedColumn === dropColumn;

  if (isSameRow) {
    const columnStep = draggedColumn < dropColumn ? 1 : -1;

    let currentColumn = draggedColumn + columnStep;

    while (currentColumn !== dropColumn) {
      if (
        boardState.some(
          (piece) => piece.row === draggedRow && piece.column === currentColumn
        )
      ) {
        return true; // Path is blocked
      }
      currentColumn += columnStep;
    }
    return false;
  }

  if (isSameColumn) {
    const rowStep = draggedRow < dropRow ? 1 : -1;

    let currentRow = draggedRow + rowStep;

    while (currentRow !== dropRow) {
      if (
        boardState.some(
          (piece) => piece.row === currentRow && piece.column === draggedColumn
        )
      ) {
        return true; // Path is blocked
      }
      currentRow += rowStep;
    }
    return false;
  }

  return false;
};

const isBishopMoveValid = ({
  draggedData,
  onDropPayload,
  boardState,
}: IHandlePieceDrop) => {
  const { row: draggedRow, column: draggedColumn } = draggedData;
  const { row: dropRow, column: dropColumn } = onDropPayload;

  const rowDiff = Math.abs(draggedRow - dropRow);
  const columnDiff = Math.abs(draggedColumn - dropColumn);

  // Check for diagonal move
  if (rowDiff === columnDiff) {
    return !isBishopMoveBlocked({ draggedData, onDropPayload, boardState });
  }

  return false;
};

const isQueenMoveValid = ({
  draggedData,
  onDropPayload,
  boardState,
}: IHandlePieceDrop) => {
  // Queen's move combines Rook and Bishop
  return (
    isRookMoveValid({ draggedData, onDropPayload, boardState }) ||
    isBishopMoveValid({ draggedData, onDropPayload, boardState })
  );
};

const isKingMoveValid = ({
  draggedData,
  onDropPayload,
  boardState,
}: IHandlePieceDrop) => {
  const { row: draggedRow, column: draggedColumn } = draggedData;
  const { row: dropRow, column: dropColumn } = onDropPayload;

  const isSameRow = draggedRow === dropRow;
  const isSameColumn = draggedColumn === dropColumn;

  const isSameDiagonal =
    Math.abs(draggedRow - dropRow) === Math.abs(draggedColumn - dropColumn) &&
    Math.abs(draggedRow - dropRow) <= 1;

  if (isSameRow || isSameColumn || isSameDiagonal) {
    return true;
  }

  return false;
};

const isWithinBoardBounds = (row: number, column: number) => {
  return row >= 0 && row < 8 && column >= 0 && column < 8;
};

const isValidMove = ({
  draggedData,
  onDropPayload,
  boardState,
}: IHandlePieceDrop) => {
  const { row: dropRow, column: dropColumn } = onDropPayload;

  if (!isWithinBoardBounds(dropRow, dropColumn)) return false;

  // check if the dropped piece is not the same as the dragged piece
  const isDropSquareSameAsDraggedSquare = isDroppedSquareSameAsDraggedSquare({
    draggedData,
    onDropPayload,
  });

  const isDroppedSquarePieceTypeSameAsDraggedSquare =
    isDroppedSquareTypeSameAsDraggedSquare({
      draggedData,
      onDropPayload,
    });

  const isNotAValidMove =
    isDropSquareSameAsDraggedSquare ||
    isDroppedSquarePieceTypeSameAsDraggedSquare;

  if (isNotAValidMove) return false;

  const { type } = draggedData;

  // Validations for each piece type
  switch (type) {
    case PIECE_TYPE.PAWN:
      return isPawnMoveValid({ draggedData, onDropPayload, boardState });
    case PIECE_TYPE.ROOK:
      return isRookMoveValid({
        draggedData,
        onDropPayload,
        boardState,
      });
    case PIECE_TYPE.KNIGHT:
      return isKnightMoveValid({
        draggedData,
        onDropPayload,
        boardState,
      });
    case PIECE_TYPE.BISHOP:
      return isBishopMoveValid({
        draggedData,
        onDropPayload,
        boardState,
      });
    case PIECE_TYPE.QUEEN:
      return isQueenMoveValid({
        draggedData,
        onDropPayload,
        boardState,
      });
    case PIECE_TYPE.KING:
      return isKingMoveValid({
        draggedData,
        onDropPayload,
        boardState,
      });
    default:
      return false;
  }
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
