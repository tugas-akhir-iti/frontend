/* eslint-disable @next/next/no-html-link-for-pages */
import React from "react";
import Link from "next/link"
import InputBox from "./inputBox";
import CategoryCard from "./categoryCard";

function FormRegister() {
    return (

        <>

            <h3 className="fw-bold mb-3 pb-3" style={{ letterSpacing: "1px" }}>
                Daftar
            </h3>
            <form>
                <div className="col-12 mt-2">
                    <label>Nama</label>
                    <InputBox
                        type="text"
                        name="nama"
                        className="form-control mt-2"
                        placeholder="Nama Lengkap"
                    />
                </div>

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

                <div className="col-12 mt-2">
                    <label>Role</label>
                    <select name="role"
                        className="form-select mt-2"
                        aria-label="Default select example"
                        style={{
                            padding: "12px 16px",
                            border: "1px solid #D0D0D0",
                            borderRadius: "16px",
                            display: "flex"
                        }}
                    >
                        <option value="">Pilih Role</option>
                        <option value="1">Seller</option>
                        <option value="2">Buyer</option>
                    </select>
                </div>

                <div className="mt-4 mb-4 text-center fw-bold">
                    <div className="start-0 end-0 d-flex">
                        <CategoryCard
                            className="p-3 flex-grow-1"
                            text="Daftar"
                            rad="16"
                        />
                    </div>
                </div>
            </form>



        </>

    );
}

export default FormRegister;
