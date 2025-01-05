import { IBoardState } from "../../chess.interface";
import chessUtil from "../../chess.util";
import { Piece } from "../piece";

interface ICapturedPiecesProps {
  boardState: IBoardState[];
}

export const CapturedPieces = ({ boardState = [] }: ICapturedPiecesProps) => {
  const { capturedBlackPieces, capturedWhitePieces } =
    chessUtil.capturedPieces(boardState);

  return (
    <div className="captured-pieces">
      Captured Pieces
      <div className="captured-pieces-container">
        <div className="captured-pieces-black">
          Black {capturedBlackPieces.length}
          <div className="captured-black-pieces-flex">
            {capturedBlackPieces.map((piece, index) => (
              <div key={index} className="black-piece">
                <Piece pieceType={piece.type} className="captured-piece" />
              </div>
            ))}
          </div>
        </div>
        <div className="captured-pieces-white">
          White {capturedBlackPieces.length}
          <div className="captured-white-pieces-flex">
            {capturedWhitePieces.map((piece, index) => (
              <div key={index} className="white-piece">
                <Piece pieceType={piece.type} className="captured-piece" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
