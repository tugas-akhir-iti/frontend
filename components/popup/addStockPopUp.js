import React from "react";
import MainModalLayout from "../../layout/mainModalLayout";
import CategoryCard from "../categoryCard";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;


export default function AddStockPopUp({
  token,
  user,
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
  const [productData, setProductData] = useState({
    product_stock: null,
  });

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
    // alert(Number(productData.product_stock) + product_stock)
    // const data = new FormData();
    // data.append("product_stock", Number(orderData.cart_qty));
    // data.append("product_id", product_id);
  
      if(productData.product_stock != null){
        try {
          await axios({
            method: "put",
            url: `${API}/products/${product_id}`,
            data: {
              "product_stock" : Number(productData.product_stock) + product_stock ,
            },
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": `multipart/form-data`,
            },
          });
          notify("Sukses Tambahkan Stok")
          setTimeout(() => {
            router.reload()
          }, 2500);
        } catch (error) {
          console.log(error.response);
        }
      }else{
        notify("Masukan Stok")
      }
      
   
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  return (
    <MainModalLayout
      onClick={onClick}
      title={`Tambahakan Stok`}
      description={`Masukan jumlah stok barang`}
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
      <p className="m-0">Stok sekarang {product_stock} kg</p>

      <form onSubmit={handleSubmit} className="d-flex flex-column">
        <div className="input-group my-2">
          <input 
            type="number" 
            name="product_stock"
            className="form-control" 
            // ariaLabel="Amount (to the nearest dollar)" 
            min={0}
            placeholder={product_stock}
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
