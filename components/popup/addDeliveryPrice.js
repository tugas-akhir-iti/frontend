import React from "react";
import MainModalLayout from "../../layout/mainModalLayout";
import CategoryCard from "../categoryCard";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
const API = process.env.NEXT_PUBLIC_API_ENDPOINT;



export default function AddDeliveryPricePopUp({
  onClick,
  idOrder,
  token,
}) {
  console.log(idOrder, token);
  const router = useRouter();
  const [orderDeliveryPrice, setOrderDeliveryPrice] = useState(null);

  const notify = (title) =>
  toast.success(title, {
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
    data.append("order_delivery_price", Number(orderDeliveryPrice));
    if (token) {
      if(orderDeliveryPrice != null){
        try {
          await axios({
            method: "put",
            url: `${API}/orders/order-delivery/${idOrder}`,
            data: data,
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": `multipart/form-data`,
            },
          });
          notify("Sukses Tambahkan Ongkos Kirim")
          setTimeout(() => {
            router.reload()
          }, 2500);
        } catch (error) {
          console.log(error.response);
        }
      }else{
        notify("Masukan ongkos kirim")
      }
      
    } else {
      notify("Login terlebih dahulu")
        setTimeout(() => {
          router.replace("/account/login");
        }, 2500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });
  };

  return (
    <MainModalLayout
      onClick={onClick}
      title={`Ongkos Kirim`}
      description={`Masukan ongkos pengirman barang`}
    >
      <form className="d-flex flex-column" onSubmit={handleSubmit}>
        <div className="input-group my-2">
        <div className="input-group-append">
            <span className="input-group-text">Rp</span>
          </div>
          <input 
            type="number" 
            className="form-control" 
            ariaLabel="Amount (to the nearest dollar)" 
            placeholder={"120.000"}
            onChange={(e)=>setOrderDeliveryPrice(e.target.value)}
          />
        </div>
        <CategoryCard
          className={"py-2"}
          text={"Kirim"}
          rad={"8"}
          type="submit"
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
