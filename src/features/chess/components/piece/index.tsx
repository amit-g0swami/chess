import { PIECE_MAPPER } from "../../chess.const";
import { PIECE_TYPE } from "../../chess.interface";

interface IPieceProps {
  pieceType: PIECE_TYPE;
}

export const Piece = ({ pieceType }: IPieceProps) => {
  return (
    <span className="piece-span">{pieceType && PIECE_MAPPER[pieceType]}</span>
  );
};
