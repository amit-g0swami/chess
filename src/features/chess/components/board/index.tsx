import React from "react";
import {
  BOARD_LENGTH,
  IBoardState,
  INITIAL_BOARD_STATE,
} from "../../chess.interface";
import { RenderTurn } from "../header";
import { Row } from "../row";

export const Board = () => {
  const [boardState, setBoardState] =
    React.useState<IBoardState[]>(INITIAL_BOARD_STATE);
  const [isWhiteTurn, setIsWhiteTurn] = React.useState<boolean>(true);

  const rows = Array.from({ length: BOARD_LENGTH }, (_, i) => {
    const rowId = i + 1;
    return {
      rowId: rowId,
    };
  });

  return (
    <div className="board">
      <RenderTurn isWhiteTurn={isWhiteTurn} />
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
