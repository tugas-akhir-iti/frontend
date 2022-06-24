import React from "react";

function ItemCard() {
  return (
    <div className="card p-2" style={{ height: "100%" }}>
      <img className="rounded" src="airpodsmax.jpg" alt="barang" />
      <h4 className="mt-2">Airpods Max</h4>
      <p className="mb-1">Elektronik</p>
      <h5>Rp. 8.799.000</h5>
    </div>
  );
}

export default ItemCard;
