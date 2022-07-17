import React, { useState } from "react";
import { useRouter } from "next/router";
import FormData from "form-data";
import axios from "axios";
import Head from "next/head";
import InputBox from "../components/inputBox";
import CategoryCard from "../components/categoryCard";
import MainButton from "../components/mainButton";

function AddProdukLayout() {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const [productData, setProductData] = useState({
    product_name: "",
    product_price: "",
    product_description: "",
    product_image: null,
    category_id: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("product_name", productData.product_name);
    data.append("product_price", Number(productData.product_price));
    data.append("product_description", productData.product_description);
    data.append("product_image", productData.product_image);
    data.append("category_id", Number(productData.category_id));
    try {
      await axios({
        method: "post",
        url: `${API}/products`,
        data: data,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("user_token")}`,
          "Content-Type": `multipart/form-data`,
        },
      });
      router.replace("/account/login");
      console.log(productData.category_id);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value });
  };

  const handleChangeFile = (e) => {
    setProductData(prev => ({...prev, product_image: e.target.files[0]}))
  } 
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="p-3 d-flex flex-column">
          <div className="col-12 mt-2">
            <label>Nama Produk</label>
            <InputBox
              type="text"
              name="product_name"
              className="form-control mt-2"
              placeholder="Nama Produk"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-12 mt-2">
            <label>Harga Produk</label>
            <InputBox
              type="text"
              name="product_price"
              className="form-control mt-2"
              placeholder="Rp 0,00"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div className="col-12 mt-2">
            <label>Kategori</label>
            <select
              className="form-select mt-2"
              aria-label="Default select example"
              onChange={(e) => handleChange(e)}
              style={{
                padding: "12px 16px",
                border: "1px solid #D0D0D0",
                borderRadius: "16px",
                display: "flex",
              }}
            >
              <option value="">Pilih Kategori</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          <div className="col-12 mt-2">
            <label>Deskripsi</label>
            <textarea
              className="form-control mt-2"
              name="product_description"
              rows="2"
              placeholder="Contoh: Jalan Ikan Hiu 33"
              style={{
                padding: "12px 16px",
                border: "1px solid #D0D0D0",
                borderRadius: "16px",
                background: "#FFFFFF",
                display: "flex",
              }}
              onChange={(e) => handleChange(e)}
            ></textarea>
          </div>
          <div className="col-12 mt-2">
            <label>Foto Produk</label>
            {/* <button
              className="flex-fill d-flex flex-column justify-content-center rounded mt-2"
              style={{
                borderStyle: "dashed",
                borderWidth: "2px",
                borderColor: "lightgray",
                color: "gray",
                width: "96px",
                height: "96px",
              }}
            >
           
              <i
                className="bi bi-plus mx-auto"
                style={{ fontSize: "2rem" }}
              ></i>
            </button> */}
            <InputBox
              type="file"
              name="product_image"
              className="form-control mt-2"
              placeholder="Rp 0,00"
              onChange={(e) => handleChangeFile(e)}
            />
          </div>
          <div className="col-12 mt-5 mb-5 fw-bold">
            <div className="d-flex flex-row gap-2">
              <MainButton
                className="p-3 flex-grow-1 text-center"
                text="Preview"
                rad="16"
              />
              <CategoryCard
                type="submit"
                className="p-3 flex-grow-1"
                text="Terbitkan"
                rad="16"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddProdukLayout;
