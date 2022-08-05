import React from "react";
import useResize from "../hooks/useResize";

function ListProduct(props) {
  const screen = useResize();
  const amount = props.productPrice * props.cartQty;
  return (
    <>
    {screen.md ? (
    <div
        className="d-flex flex-row p-3 gap-4 align-items-center"
      >
        <img
          src={props.productImage}
          alt="foto produk"
          style={{ height: "4rem", borderRadius: "1rem" }}
        />
        <div className="flex-fill d-flex flex-column justify-content-center">
          <h6 className="m-0">{props.productName}</h6>
          <p className="m-0">Stok {props.productStock}</p>
          <p className="m-0">Rp.{props.productPrice} / kg</p>
        </div>
        <input type="number" style={{width:"60px", height: "35px"}} defaultValue={props.cartQty} min={props.minOrder} max={props.productStock}/>
        <h6 style={{height: "35px", fontWeight:"600"}} className="pt-2">Rp. {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h6>
        <button className="ms-auto me-2 bi bi-trash3" style={{width:"20px"}} value={props.value} onClick={props.handleDelete} name="button-delete"></button>
      </div>
    ) : (
      <div
        className="d-flex flex-column m-0 p-0 gap-0 "
        // style={{backgroundColor:"Blue"}}
      >
        <div className="d-flex gap-2 align-items-center justify-content-between">
          <div>
            <img
              src={props.productImage}
              alt="foto produk"
              style={{ height: "4rem", borderRadius: "1rem" }}
            />
          </div>
          
          <div>
            <h6 className="m-0">{props.productName}</h6>
            <p className="m-0">Stok {props.productStock}</p>
            <p className="m-0">Rp.{props.productPrice} / kg</p>
          </div>
          <div>
            <input type="number" style={{width:"50px", height: "35px"}} defaultValue={props.cartQty} min={props.minOrder} max={props.productStock}/>
          </div>
          <div>
            <button className="bi bi-trash3" style={{width:"20px"}} value={props.value} onClick={props.handleDelete} name="button-delete"></button>
          </div>
        </div>
        <h6 style={{height: "35px", fontWeight:"600"}} className="align-self-end">Rp. {amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h6>
      </div>

    )}
    </>
  );
}

export default ListProduct;
