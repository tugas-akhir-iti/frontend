import React from "react";

function OwnerCard({foto, fotoalt, nama, kota, isOwner }) {
  return (
    <div className="card d-flex flex-row p-2">
      <img src={foto} alt={fotoalt} />
      <div className="flex-fill">
        <h3>{nama}</h3>
        <p>{kota}</p>
      </div>
      {isOwner && <button>Edit</button>}
    </div>
  );
}

export default OwnerCard;
