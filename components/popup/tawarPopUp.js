import React from "react";
import MainModalLayout from "../../layout/mainModalLayout";
import CategoryCard from "../categoryCard";

export default function TawarPopUp() {
  return (
    <MainModalLayout
      title={`Masukkan Harga Tawaranmu`}
      description={`Harga tawaranmu akan diketahui penjual, jika penjual cocok kamu akan segera dihubungi penjual.`}
    >
      <div className="d-flex p-2" style={{backgroundColor: "#EEEEEE", borderRadius: "8px"}}>
        <img src="/airpodsmax.jpg" alt="airpodsmax" style={{height: "48px", borderRadius: "8px", marginRight: "4px"}} />
        <div>
          <b>Airpods Max</b>
          <p className="m-0 p-0">Rp. 250.000</p>
        </div>
      </div>
      <p className="m-0">Harga Tawar</p>
      <input
        className="card mb-3 mt-1 p-1"
        style={{ borderRadius: "8px" }}
        type="text"
        placeholder="Rp 0,00"
      />
      <CategoryCard className={"py-2"} text={"Kirim"} rad={"8"} />
    </MainModalLayout>
  );
}
