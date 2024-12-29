interface IRenderTurnProps {
  isWhiteTurn: boolean;
}

export const RenderTurn = ({ isWhiteTurn }: IRenderTurnProps) => {
  return (
    <div className="renderTurn-container">
      Current Turn
      <div className="turn-container">
        <input
          type="radio"
          id="white"
          name="turn"
          value="white"
          checked={isWhiteTurn}
        />
        <label htmlFor="white">White</label>
        <input
          type="radio"
          id="black"
          name="turn"
          value="black"
          checked={!isWhiteTurn}
        />
        <label htmlFor="black">Black</label>
      </div>
    </div>
  );
};
