import React from "react";

function ItemList() {
  return (
    <div className="d-flex gap-3 container-fluid my-2">
      <div style={{ width: "20%" }}>
        <img
          style={{ width: "100%", borderRadius: "12px" }}
          src="airpodsmax.jpg"
          alt="barang"
        />
      </div>
      <div className="d-flex flex-column flex-grow-1">
        <div className="d-flex flex-grow justify-content-between">
          <p className="m-0">Penawaran Produk</p>
          <p className="m-0">24 Apr, 15.40</p>
        </div>
        <h4>Airpods Max</h4>
        <p className="m-0">Rp. 4.999.000</p>
        <p className="m-0">Ditawar Rp. 3.999.000</p>
      </div>
    </div>
  );
}

export default ItemList;