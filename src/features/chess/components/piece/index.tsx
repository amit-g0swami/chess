import { IPieceProps, PIECE_MAPPER } from "../../chess.interface";

export const Piece = ({ pieceType }: IPieceProps) => {
  return (
    <span className="piece-span">{pieceType && PIECE_MAPPER[pieceType]}</span>
  );
};
