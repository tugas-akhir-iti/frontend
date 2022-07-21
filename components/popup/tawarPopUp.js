import React from "react";
import MainModalLayout from "../../layout/mainModalLayout";
import CategoryCard from "../categoryCard";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

export default function TawarPopUp({ product_name, product_image, product_price, product_id }) {
  // console.log(product_id);
  const router = useRouter();
  const [orderData, setOrderData] = useState({
    product_id: null,
    order_price: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("product_id", product_id);
    data.append("order_price", Number(orderData.order_price));
    try {
      await axios({
        method: "post",
        url: `${API}/orders`,
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
          "Content-Type": `multipart/form-data`,
        },
      });

      window.location.reload();
      alert('sukses');

    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({ ...orderData, [name]: value });

  };


  return (
    <MainModalLayout
      title={`Masukkan Harga Tawaranmu`}
      description={`Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan segera dihubungi penjual.`}
    >
      <div className="d-flex p-2" style={{ backgroundColor: "#EEEEEE", borderRadius: "8px" }}>
        <img src={product_image} alt="" style={{ height: "48px", borderRadius: "8px", marginRight: "4px" }} />
        <div>
          <b>{product_name}</b>
          <p className="m-0 p-0">{product_price}</p>
        </div>
      </div>
      <p className="m-0">Harga Tawar</p>

      <form onSubmit={handleSubmit}>

        <input
          name="order_price"
          className="card mb-3 mt-1 p-1"
          style={{ borderRadius: "8px" }}
          type="number"
          placeholder="Rp 0,00"
          onChange={(e) => handleChange(e)}
        />
        <CategoryCard className={"py-2"} text={"Kirim"} rad={"8"} type="submit" />
      </form>
    </MainModalLayout>
  );
}
