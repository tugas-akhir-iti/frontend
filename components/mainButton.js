import React from "react";

function MainButton({ text }) {
  return (
    <button
      className="d-flex align-items-center rounded px-3 py-1 gap-2"
      style={{
        color: "black",
        border: "1px",
        borderStyle: "solid",
        borderWidth: "2px",
        borderColor: "var(--purple)",
      }}
    >
      <p className="m-0">{text}</p>
    </button>
  );
}

export default MainButton;
