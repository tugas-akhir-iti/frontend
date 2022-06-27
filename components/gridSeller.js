import React from "react";
import ItemCard from "./itemCard";

function GridSeller() {
  return (
    <>
      <div className="col-6 col-md-4 d-flex">
        <button
          className="flex-fill d-flex flex-column justify-content-center rounded"
          style={{
            borderStyle: "dashed",
            borderWidth: "2px",
            borderColor: "lightgray",
            color: "gray",
          }}
        >
          <i className="bi bi-plus mx-auto" style={{ fontSize: "2rem" }}></i>
          <p className="mx-auto">Tambah Produk</p>
        </button>
      </div>
      <div className="col-6 col-md-4">
        <ItemCard></ItemCard>
      </div>
      <div className="col-6 col-md-4">
        <ItemCard></ItemCard>
      </div>
      <div className="col-6 col-md-4">
        <ItemCard></ItemCard>
      </div>
      <div className="col-6 col-md-4">
        <ItemCard></ItemCard>
      </div>
      <div className="col-6 col-md-4">
        <ItemCard></ItemCard>
      </div>
      <div className="col-6 col-md-4">
        <ItemCard></ItemCard>
      </div>
      <div className="col-6 col-md-4">
        <ItemCard></ItemCard>
      </div>
    </>
  );
}

export default GridSeller;
