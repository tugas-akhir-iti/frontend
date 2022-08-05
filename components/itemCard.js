import React from "react";

function ItemCard({ name, price, regency, image, stock }) {
  return (

    <div className="card p-2" style={{ height: "100%", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)"}}>
      <img className="rounded" src={image} alt={name} />
      <h5 className="mt-2 ms-2">{name}</h5>
      <p className="mb-0 mt-0 ms-2" style={{color:"grey", fontSize:"1.1rem"}}>{regency}</p>
      <p className="mb-1 ms-2" style={{color:"grey", fontSize:"1.1rem"}}>Stok : {stock} kg</p>
      <h5 className="mb-3 ms-2" >Rp. {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} /kg</h5>
    </div>

  );
}

export default ItemCard;
