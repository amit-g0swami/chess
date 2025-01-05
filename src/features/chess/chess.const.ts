import { COLOR, IBoardState, PIECE_TYPE } from "./chess.interface";

export const INITIAL_BOARD_STATE: IBoardState[] = [
  {
    id: 1,
    type: PIECE_TYPE.ROOK,
    color: COLOR.WHITE,
    row: 1,
    column: 1,
  },
  {
    id: 2,
    type: PIECE_TYPE.KNIGHT,
    color: COLOR.WHITE,
    row: 1,
    column: 2,
  },
  {
    id: 3,
    type: PIECE_TYPE.BISHOP,
    color: COLOR.WHITE,
    row: 1,
    column: 3,
  },
  {
    id: 4,
    type: PIECE_TYPE.QUEEN,
    color: COLOR.WHITE,
    row: 1,
    column: 4,
  },
  {
    id: 5,
    type: PIECE_TYPE.KING,
    color: COLOR.WHITE,
    row: 1,
    column: 5,
  },
  {
    id: 6,
    type: PIECE_TYPE.BISHOP,
    color: COLOR.WHITE,
    row: 1,
    column: 6,
  },
  {
    id: 7,
    type: PIECE_TYPE.KNIGHT,
    color: COLOR.WHITE,
    row: 1,
    column: 7,
  },
  {
    id: 8,
    type: PIECE_TYPE.ROOK,
    color: COLOR.WHITE,
    row: 1,
    column: 8,
  },
  {
    id: 9,
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 1,
  },
  {
    id: 10,
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 2,
  },
  {
    id: 11,
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 3,
  },
  {
    id: 12,
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 4,
  },
  {
    id: 13,
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 5,
  },
  {
    id: 14,
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 6,
  },
  {
    id: 15,
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 7,
  },
  {
    id: 16,
    type: PIECE_TYPE.PAWN,
    color: COLOR.WHITE,
    row: 2,
    column: 8,
  },
  {
    id: 17,
    type: PIECE_TYPE.ROOK,
    color: COLOR.BLACK,
    row: 8,
    column: 1,
  },
  {
    id: 18,
    type: PIECE_TYPE.KNIGHT,
    color: COLOR.BLACK,
    row: 8,
    column: 2,
  },
  {
    id: 19,
    type: PIECE_TYPE.BISHOP,
    color: COLOR.BLACK,
    row: 8,
    column: 3,
  },
  {
    id: 20,
    type: PIECE_TYPE.QUEEN,
    color: COLOR.BLACK,
    row: 8,
    column: 4,
  },
  {
    id: 21,
    type: PIECE_TYPE.KING,
    color: COLOR.BLACK,
    row: 8,
    column: 5,
  },
  {
    id: 22,
    type: PIECE_TYPE.BISHOP,
    color: COLOR.BLACK,
    row: 8,
    column: 6,
  },
  {
    id: 23,
    type: PIECE_TYPE.KNIGHT,
    color: COLOR.BLACK,
    row: 8,
    column: 7,
  },
  {
    id: 24,
    type: PIECE_TYPE.ROOK,
    color: COLOR.BLACK,
    row: 8,
    column: 8,
  },
  {
    id: 25,
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 1,
  },
  {
    id: 26,
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 2,
  },
  {
    id: 27,
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 3,
  },
  {
    id: 28,
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 4,
  },
  {
    id: 29,
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 5,
  },
  {
    id: 30,
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 6,
  },
  {
    id: 31,
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 7,
  },
  {
    id: 32,
    type: PIECE_TYPE.PAWN,
    color: COLOR.BLACK,
    row: 7,
    column: 8,
  },
];

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

export const ROWS = Array.from({ length: BOARD_LENGTH }, (_, i) => {
  const rowId = i + 1;
  return {
    rowId: rowId,
  };
});
