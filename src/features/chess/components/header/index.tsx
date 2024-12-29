export const RenderTurn = ({ isWhiteTurn }: { isWhiteTurn: boolean }) => {
  const turn = isWhiteTurn ? "White" : "Black";
  return <div className="renderturn-container">Turn: {turn}</div>;
};
