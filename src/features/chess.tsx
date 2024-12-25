import "./chess.css";
import React from "react";
import { createPortal } from "react-dom";

const PIECE_MAPPER = {
  pawn: "♟",
  rook: "♜",
  knight: "♞",
  bishop: "♝",
  queen: "♛",
  king: "♚",
};

const BOARD_LENGTH = 8;

const SETDATA_KEY = "dragged-piece";

enum PIECE_TYPE {
  PAWN = "pawn",
  ROOK = "rook",
  KNIGHT = "knight",
  BISHOP = "bishop",
  QUEEN = "queen",
  KING = "king",
}

enum DOM_ELEMENT {
  ROOT = "root",
}

enum COLOR {
  WHITE = "white",
  BLACK = "black",
}

interface RowProps {
  rowId: number;
  boardState: BoardState[];
  isWhiteTurn: boolean;
  setIsWhiteTurn: React.Dispatch<React.SetStateAction<boolean>>;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState[]>>;
}

interface SquareProps {
  squareType: COLOR;
  columnId: number;
  rowId: number;
  boardState: BoardState[];
  isWhiteTurn: boolean;
  setIsWhiteTurn: React.Dispatch<React.SetStateAction<boolean>>;
  setBoardState: React.Dispatch<React.SetStateAction<BoardState[]>>;
}

interface PieceProps {
  pieceType: PIECE_TYPE;
}

interface BoardState {
  type: PIECE_TYPE;
  color: COLOR;
  row: number;
  column: number;
}

interface IdetailsForOnDrop {
  rowId: number;
  columnId: number;
  boardState: BoardState[];
}

interface IOnDropPayload {
  row: number;
  column: number;
  color: COLOR | null;
  pieceType: PIECE_TYPE | null;
}

interface IhandlePieceDrop {
  draggedData: BoardState;
  onDropPayload: IOnDropPayload;
  boardState: BoardState[];
}

interface IhandleValidateTurn {
  draggedData: BoardState;
  isWhiteTurn: boolean;
}

type SameSqaureProps = Omit<IhandlePieceDrop, "boardState">;

const INITIAL_BOARD_STATE: BoardState[] = [
  {
    type: PIECE_TYPE.ROOK,
    color: COLOR.WHITE,
    row: 1,
    column: 1,
  },
  {
    type: PIECE_TYPE.KNIGHT,
    color: COLOR.WHITE,
    row: 1,
    column: 2,
  },
  {
    type: PIECE_TYPE.BISHOP,
    color: COLOR.WHITE,
    row: 1,
    column: 3,
  },
  {
    type: PIECE_TYPE.QUEEN,
    color: COLOR.WHITE,
    row: 1,
    column: 4,
  },
  {
    type: PIECE_TYPE.KING,
    color: COLOR.WHITE,
    row: 1,
    column: 5,
  },
  {
    type: PIECE_TYPE.BISHOP,
    color: COLOR.WHITE,
    row: 1,
    column: 6,
  },
  {
    type: PIECE_TYPE.KNIGHT,
    color: COLOR.WHITE,
    row: 1,
    column: 7,
  },
  {
    type: PIECE_TYPE.ROOK,
    color: COLOR.WHITE,
    row: 1,
    column: 8,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 1,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 2,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 3,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 4,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 5,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 6,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 7,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 8,
  },
  {
    type: PIECE_TYPE.ROOK,
    color: COLOR.BLACK,
    row: 8,
    column: 1,
  },
  {
    type: PIECE_TYPE.KNIGHT,
    color: COLOR.BLACK,
    row: 8,
    column: 2,
  },
  {
    type: PIECE_TYPE.BISHOP,
    color: COLOR.BLACK,
    row: 8,
    column: 3,
  },
  {
    type: PIECE_TYPE.QUEEN,
    color: COLOR.BLACK,
    row: 8,
    column: 4,
  },
  {
    type: PIECE_TYPE.KING,
    color: COLOR.BLACK,
    row: 8,
    column: 5,
  },
  {
    type: PIECE_TYPE.BISHOP,
    color: COLOR.BLACK,
    row: 8,
    column: 6,
  },
  {
    type: PIECE_TYPE.KNIGHT,
    color: COLOR.BLACK,
    row: 8,
    column: 7,
  },
  {
    type: PIECE_TYPE.ROOK,
    color: COLOR.BLACK,
    row: 8,
    column: 8,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 1,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 2,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 3,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 4,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 5,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 6,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 7,
  },
  {
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 8,
  },
];

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

const rootEl = document.getElementById(DOM_ELEMENT.ROOT) || document.body;

const RenderTurn = ({ isWhiteTurn }: { isWhiteTurn: boolean }) => {
  const turn = isWhiteTurn ? "White" : "Black";
  return <div className="renderturn-container">Turn: {turn}</div>;
};

const Piece = ({ pieceType }: PieceProps) => {
  return (
    <span className="piece-span">{pieceType && PIECE_MAPPER[pieceType]}</span>
  );
};

const Square = ({
  squareType,
  columnId,
  rowId,
  boardState,
  isWhiteTurn,
  setIsWhiteTurn,
  setBoardState,
}: SquareProps) => {
  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    piece: BoardState
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

const Row = ({
  rowId,
  boardState,
  isWhiteTurn,
  setIsWhiteTurn,
  setBoardState,
}: RowProps) => {
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

const Board = () => {
  const [boardState, setBoardState] =
    React.useState<BoardState[]>(INITIAL_BOARD_STATE);
  const [isWhiteTurn, setIsWhiteTurn] = React.useState<boolean>(true);

  const rows = Array.from({ length: BOARD_LENGTH }, (_, i) => {
    const rowId = i + 1;
    return {
      rowId: rowId,
    };
  });

  return (
    <div className="board">
      <RenderTurn isWhiteTurn={isWhiteTurn} />
      <div className={`${isWhiteTurn ? "rotate-white" : "rotate-black"}`}>
        {rows.map((row) => (
          <div key={row.rowId} className="row-container">
            <div className={`${isWhiteTurn ? "rotate-white" : "rotate-black"}`}>
              R {row.rowId}
            </div>
            <Row
              rowId={row.rowId}
              boardState={boardState}
              isWhiteTurn={isWhiteTurn}
              setIsWhiteTurn={setIsWhiteTurn}
              setBoardState={setBoardState}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export const Chess = () => {
  return <React.Fragment>{createPortal(<Board />, rootEl)}</React.Fragment>;
};
