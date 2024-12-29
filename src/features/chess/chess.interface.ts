export enum DOM_ELEMENT {
  ROOT = "root",
}

export enum COLOR {
  WHITE = "white",
  BLACK = "black",
}

export interface IRow {
  rowId: number;
}

export enum PIECE_TYPE {
  PAWN = "pawn",
  ROOK = "rook",
  KNIGHT = "knight",
  BISHOP = "bishop",
  QUEEN = "queen",
  KING = "king",
}

export interface IBoardState {
  type: PIECE_TYPE;
  color: COLOR;
  row: number;
  column: number;
}

export interface IDetailsForOnDrop {
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

export interface IHandlePieceDrop {
  draggedData: IBoardState;
  onDropPayload: IOnDropPayload;
  boardState: IBoardState[];
}

export interface IHandleValidateTurn {
  draggedData: IBoardState;
  isWhiteTurn: boolean;
}

export type SameSqaureProps = Omit<IHandlePieceDrop, "boardState">;
