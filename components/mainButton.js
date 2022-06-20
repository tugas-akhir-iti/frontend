import React from "react";

function MainButton({ className,text, rad }) {
  return (
    <button
      className={className}
      style={{
        color: "black",
        border: "1px",
        borderStyle: "solid",
        borderWidth: "2px",
        borderRadius: `${rad}px`,
        borderColor: "var(--purple)",
      }}
    >
      <p className="m-0">{text}</p>
    </button>
  );
}

export default MainButton;
