import React from "react";
import {
  OutlineLikeIcon,
  FilledLikeIcon,
  FilledSaveIcon,
  OutlineSaveIcon,
} from "../icons";

export default function ActionButton(props) {
  return (
    <>
      <button className="action-btn" onClick={props.onClick}>
        {props.icon}
      </button>
    </>
  );
}
