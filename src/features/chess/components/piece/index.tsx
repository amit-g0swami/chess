import { PIECE_MAPPER } from "../../chess.const.ts";
import { PIECE_TYPE } from "../../chess.interface";

interface IPieceProps {
  pieceType: PIECE_TYPE;
  className?: string;
}

export const Piece = ({ pieceType, className = "piece-span" }: IPieceProps) => {
  return (
    <span className={className}>{pieceType && PIECE_MAPPER[pieceType]}</span>
  );
};
