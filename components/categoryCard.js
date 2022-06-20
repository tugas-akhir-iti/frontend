import React from "react";

function CategoryCard({ text, icon, rad }) {
  return (
    <button
      className="d-flex align-items-center px-3 py-1 gap-2"
      style={{
        color: "white",
        backgroundColor: "var(--purple)",
        borderRadius: `${rad}px`,
      }}
    >
      <i className={`bi bi-${icon} mx-auto`} style={{ fontSize: "1.5rem" }}></i>
      <p className="m-0">{text}</p>
    </button>
  );
}

export default CategoryCard;
