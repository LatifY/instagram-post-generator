import React from "react";

export default function Lang(props) {
  return (
    <>
      <a style={{ cursor:"pointer" }} onClick={props.onClick}>
        {
          props.active && <span style={{ fontWeight:700 }}>{props.text}</span> || <span>{props.text}</span>
        }
      </a>
    </>
  );
}
