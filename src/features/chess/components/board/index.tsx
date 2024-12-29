import useChessStore from "../../store/chess.store";
import { CapturedPieces } from "../captured-pieces";
import { RenderTurn } from "../header";
import { Row } from "../row";

export const Board = () => {
  const { rows, boardState, isWhiteTurn, setIsWhiteTurn, setBoardState } =
    useChessStore();

  return (
    <div className="board">
      <div className="board-container">
        <RenderTurn isWhiteTurn={isWhiteTurn} />
        <CapturedPieces boardState={boardState} />
      </div>
      <div className={`${isWhiteTurn ? "rotate-white" : "rotate-black"}`}>
        {rows.map((row) => (
          <div key={row.rowId} className="row-container">
            <div
              className={`${
                isWhiteTurn ? "rotate-white" : "rotate-black"
              } row-span`}
            >
              R {row.rowId}
            </div>
            <Row
              rowId={row.rowId}
              boardState={boardState}
              isWhiteTurn={isWhiteTurn}
              setIsWhiteTurn={setIsWhiteTurn}
              setBoardState={setBoardState}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
