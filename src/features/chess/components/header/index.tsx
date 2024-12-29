interface IRenderTurnProps {
  isWhiteTurn: boolean;
}

export const RenderTurn = ({ isWhiteTurn }: IRenderTurnProps) => {
  const turn = isWhiteTurn ? "White" : "Black";
  return <div className="renderturn-container">Turn: {turn}</div>;
};
