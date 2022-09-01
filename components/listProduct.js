import { useRouter } from "next/router";
import React, {useState} from "react";
import useResize from "../hooks/useResize";
import EditCartPopUp from "./popup/editCartPopUp";

function ListProduct(props) {
  const router = useRouter();
  const path = router.pathname;
  const screen = useResize();
  const amount = props.productPrice * props.quantity;
  const [editCartPopUp, setEditCartPopUp] = useState(false);
  const handleEditCart = () => setEditCartPopUp((editCartPopUp =! editCartPopUp));

  const rupiah = (number)=>{
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  }

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
        <div className="d-flex flex-column">
          <h6 className="m-0">{props.productName}</h6>
          {props.cart_id && props.productStock != null ? (<p className="m-0">Stok {props.productStock}</p>) : null}
          <p className="m-0">{rupiah(props.productPrice)} / kg</p>
        </div>
        <p style={{height: "35px", fontWeight:"400"}} className="pt-3 me-2">({props.quantity})</p>
        <h6 style={{height: "35px", fontWeight:"600"}} className="pt-3 ms-auto">{rupiah(amount)}</h6>
        {props.cart_id 
        && path != "/checkout/[id]" 
        && (<>
          <button className="ms-auto me-2 bi bi-trash3" style={{width:"20px"}} value={props.cart_id} onClick={props.handleDelete} name="button-delete"></button>
          <button className="bi bi-pencil-fill" style={{width:"20px"}} value={props.cart_id} name="button-delete" onClick={handleEditCart}></button>
          </>
        )}
      </div>
    ) : (
      <div
        className="d-flex flex-column m-0 p-0 gap-0 "
      >
        <div className="d-flex  align-items-center">
          <div>
            <img
              src={props.productImage}
              alt="foto produk"
              style={{ height: "4rem", borderRadius: "1rem" }}
            />
          </div>
          <div className="ms-2" >
            <h6 className="m-0 font-mobile">{props.productName}</h6>
            {props.productStock != null ? (<p className="m-0 font-mobile">Stok {props.productStock}</p>):null}
            <p className="m-0 font-mobile">{rupiah(props.productPrice)} / kg</p>
          </div>
          <div className="ms-auto" >
            <p style={{fontWeight:"400"}} className="pt-3 font-mobile">({props.quantity})</p>
          </div>
          {props.cart_id 
          && path != "/checkout/[id]" 
          && (
          <div className="d-flex ms-auto">
            <button className="bi bi-pencil-fill" style={{width:"20px"}} value={props.cart_id} name="button-delete" onClick={handleEditCart}></button>
            <button className="bi bi-trash3  ms-2" style={{width:"20px"}} value={props.cart_id} onClick={props.handleDelete} name="button-delete"></button>
          </div>
          )}
        </div>
        <h6 style={{fontWeight:"600"}} className="align-self-end font-mobile">{rupiah(amount)}</h6>
      </div>

    )}
    {editCartPopUp && (
      <EditCartPopUp
        token={props.token}
        onClick={handleEditCart}
        product_name={props.productName}
        product_image={props.productImage}
        product_price={props.productPrice}
        product_min_order={props.minOrder}
        product_stock={props.productStock}
        cart_qty={props.quantity}
        cart_id={props.cart_id}
        />
      )}
    </>
  );
}

export default ListProduct;
