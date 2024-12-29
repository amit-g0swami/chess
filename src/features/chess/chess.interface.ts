export const PIECE_MAPPER = {
  pawn: "♟",
  rook: "♜",
  knight: "♞",
  bishop: "♝",
  queen: "♛",
  king: "♚",
};

export const BOARD_LENGTH = 8;

export const SETDATA_KEY = "dragged-piece";

export enum PIECE_TYPE {
  PAWN = "pawn",
  ROOK = "rook",
  KNIGHT = "knight",
  BISHOP = "bishop",
  QUEEN = "queen",
  KING = "king",
}

export enum DOM_ELEMENT {
  ROOT = "root",
}

export enum COLOR {
  WHITE = "white",
  BLACK = "black",
}

export interface IRowProps {
  rowId: number;
  boardState: IBoardState[];
  isWhiteTurn: boolean;
  setIsWhiteTurn: React.Dispatch<React.SetStateAction<boolean>>;
  setBoardState: React.Dispatch<React.SetStateAction<IBoardState[]>>;
}

export interface ISquareProps {
  squareType: COLOR;
  columnId: number;
  rowId: number;
  boardState: IBoardState[];
  isWhiteTurn: boolean;
  setIsWhiteTurn: React.Dispatch<React.SetStateAction<boolean>>;
  setBoardState: React.Dispatch<React.SetStateAction<IBoardState[]>>;
}

export interface IPieceProps {
  pieceType: PIECE_TYPE;
}

export interface IBoardState {
  type: PIECE_TYPE;
  color: COLOR;
  row: number;
  column: number;
}

export interface IdetailsForOnDrop {
  rowId: number;
  columnId: number;
  boardState: IBoardState[];
}

export interface IOnDropPayload {
  row: number;
  column: number;
  color: COLOR | null;
  pieceType: PIECE_TYPE | null;
}

export interface IhandlePieceDrop {
  draggedData: IBoardState;
  onDropPayload: IOnDropPayload;
  boardState: IBoardState[];
}

export interface IhandleValidateTurn {
  draggedData: IBoardState;
  isWhiteTurn: boolean;
}

export type SameSqaureProps = Omit<IhandlePieceDrop, "boardState">;

export const INITIAL_BOARD_STATE: IBoardState[] = [
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
