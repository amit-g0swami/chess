interface IRenderTurnProps {
  isWhiteTurn: boolean;
}

export const RenderTurn = ({ isWhiteTurn }: IRenderTurnProps) => {
  const turn = isWhiteTurn ? "White" : "Black";
  return <div className="renderTurn-container">Turn: {turn}</div>;
};
