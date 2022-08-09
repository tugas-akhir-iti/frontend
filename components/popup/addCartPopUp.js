import React from "react";
import MainModalLayout from "../../layout/mainModalLayout";
import CategoryCard from "../categoryCard";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;



export default function AddCartPopUp({
  token,
  onClick,
  product_name,
  product_image,
  product_price,
  product_min_order,
  product_stock,
  product_id,
  stateChanger,
}) {
  const router = useRouter();
  const [orderData, setOrderData] = useState({
    product_id: null,
    cart_qty: "",
  });

  const notify = () =>
  toast.success("Sukses Tambahkan Keranjang", {
    position: "top-center",
    autoClose: 2500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("cart_qty", Number(orderData.cart_qty));
    data.append("product_id", product_id);
    if (token) {
      try {
        await axios({
          method: "post",
          url: `${API}/carts`,
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `multipart/form-data`,
          },
        });
        notify()
        setTimeout(() => {
          stateChanger()
        }, 2500);
      } catch (error) {
        console.log(error.response);
      }
    } else {
      alert("Please Login to continue");
      router.replace("/account/login");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  return (
    <MainModalLayout
      onClick={onClick}
      title={`Tambahakan Keranjang`}
      description={`Masukan jumlah barang yang ingin kamu beli`}
    >
      <div
        className="d-flex p-2 my-2 align-items-center"
        style={{ backgroundColor: "#EEEEEE", borderRadius: "8px" }}
      >
        
        <img
          src={product_image}
          alt=""
          style={{ height: "65px", borderRadius: "8px", marginRight: "8px" }}
        />
        
        <div>
          <b>{product_name}</b>
          <p className="m-0 p-0">Stock : {product_stock} kg</p>
          <p className="m-0 p-0">Rp. {product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} /kg</p>
        </div>
      </div>
      <p className="m-0">Min order {product_min_order} kg</p>

      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <div className="input-group my-2">
          <input 
            type="number" 
            name="cart_qty"
            className="form-control" 
            ariaLabel="Amount (to the nearest dollar)" 
            placeholder={product_min_order}
            min={product_min_order}
            max={product_stock}
            onChange={(e) => handleChange(e)}  
          />
          <div className="input-group-append">
            <span className="input-group-text">kg</span>
          </div>
        </div>
        <CategoryCard
          className={"py-2"}
          text={"Kirim"}
          rad={"8"}
          type="submit"
          // onClick={notify}
        />
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          toastStyle={{backgroundColor: "#7126B5", color: "white"}}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </form>
    </MainModalLayout>
  );
}
