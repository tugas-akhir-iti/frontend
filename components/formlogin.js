/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import Link from "next/link";
import InputBox from "./inputBox";
import CategoryCard from "./categoryCard";

function FormLogin() {
  return (
    <>
      <h3 className="fw-bold mb-3 pb-3" style={{ letterSpacing: "1px" }}>
        Masuk
      </h3>
      <form>
        <div className="col-12 mt-2">
          <label>Email</label>
          <InputBox
            type="text"
            name="harga"
            className="form-control mt-2"
            placeholder="Contoh: johndee@gmail.com"
          />
        </div>

        <div className="col-12 mt-2">
          <label>Password</label>
          <InputBox
            ype="password"
            id="form2Example28"
            placeholder="Masukkan password"
            className="form-control mt-2"
          />
        </div>
        <div className="mt-4 mb-4 text-center fw-bold">
          <div className="start-0 end-0 d-flex">
            <CategoryCard className="p-3 flex-grow-1" text="Masuk" rad="16" />
          </div>
        </div>
      </form>
    </>
  );
}

export default FormLogin;
