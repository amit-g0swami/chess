import { IBoardState } from "../../chess.interface";
import chessUtil from "../../chess.util";

interface ICapturedPiecesProps {
  boardState: IBoardState[];
}

export const CapturedPieces = ({ boardState = [] }: ICapturedPiecesProps) => {
  const {
    capturedBlackPieces,
    capturedWhitePieces,
    totalCapturedBlackPieces,
    totalCapturedWhitePieces,
  } = chessUtil.capturedPieces(boardState);
  return (
    <div className="captured-pieces">
      Captured Pieces
      <div className="captured-pieces-container">
        <div>Black {totalCapturedBlackPieces}</div>
        <div>White {totalCapturedWhitePieces}</div>
      </div>
    </div>
  );
};
