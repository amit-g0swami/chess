import "./index.css";
import React from "react";
import { createPortal } from "react-dom";
import { DOM_ELEMENT } from "./chess.interface";
import { Board } from "./components/board";

const rootEl = document.getElementById(DOM_ELEMENT.ROOT) || document.body;

export const Chess = () => {
  return <React.Fragment>{createPortal(<Board />, rootEl)}</React.Fragment>;
};
