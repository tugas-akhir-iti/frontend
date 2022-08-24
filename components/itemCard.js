import React from "react";

function ItemCard({ name, price, regency, image, stock }) {
  return (

    <div className="card p-2 pb-4" style={{ height: "100%", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)"}}>
      <img className="rounded mb-2" src={image} alt={name} />
      <h5 className="mt-0 ms-2" style={{fontSize:"1.2rem"}}>{name}</h5>
      <p className="m-0 ms-2" style={{color:"grey", fontSize:"1rem"}}>{regency}</p>
      <p className="m-0 ms-2" style={{color:"grey", fontSize:"1rem"}}>Stok : {stock} kg</p>
      <h5 className="mb-0 ms-2 mt-2" style={{fontSize:"1.1rem"}}>Rp. {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} /kg</h5>
    </div>

  );
}

export default ItemCard;
