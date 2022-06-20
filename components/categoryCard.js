import React from "react";

function CategoryCard({ text, icon }) {
  return (
    <button className="d-flex align-items-center bg-primary rounded px-3 py-1 text-white gap-2">
      <i className={`bi bi-${icon} mx-auto`} style={{ fontSize: "1.5rem" }}></i>
      <p className="m-0">{text}</p>
    </button>
  );
}

export default CategoryCard;
