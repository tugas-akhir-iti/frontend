import React from "react";
import CategoryCard from "../components/categoryCard";
import MainButton from "../components/mainButton";

function MainModalLayout() {
  return (
    <div
      className="position-absolute d-flex justify-content-center align-items-center"
      style={{
        top: "0",
        left: "0",
        height: "100vh",
        width: "100vw",
        backgroundColor: "rgba(00,00,00,0.5)",
        zIndex: "10000",
      }}
    >
      <div
        className="d-flex flex-column px-4 py-3"
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          maxWidth: "20rem",
        }}
      >
        <div className="d-flex justify-content-end">
          <i className="bi bi-x m-0 p-0" style={{ fontSize: "2rem" }}></i>
        </div>
        <h4>Masukkan Harga Tawaranmu</h4>
        <p className="mb-2">
          Harga tawaranmu akan diketahui penual, jika penjual cocok kamu akan
          segera dihubungi penjual.
        </p>
        <div></div>
        <p className="m-0">Harga Tawar</p>
        <input className="card mb-3 mt-1 p-1" style={{borderRadius: "8px"}} type="text" placeholder="Rp 0,00"/>
        <CategoryCard className={"py-2"} text={"Kirim"} rad={"8"} />
      </div>
    </div>
  );
}

export default MainModalLayout;
