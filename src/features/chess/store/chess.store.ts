import { create } from "zustand";
import { IBoardState, IRow } from "../chess.interface";
import { INITIAL_BOARD_STATE, ROWS } from "../chess.const.ts";

type ChessManagementState = {
  boardState: IBoardState[];
  isWhiteTurn: boolean;
  rows: IRow[];
  setBoardState: (boardState: IBoardState[]) => void;
  setIsWhiteTurn: (isWhiteTurn: boolean) => void;
};

const useChessStore = create<ChessManagementState>((set) => ({
  boardState: INITIAL_BOARD_STATE,
  isWhiteTurn: true,
  rows: ROWS,
  setBoardState: (boardState: IBoardState[]) => set({ boardState }),
  setIsWhiteTurn: (isWhiteTurn: boolean) => set({ isWhiteTurn }),
}));

export default useChessStore;
