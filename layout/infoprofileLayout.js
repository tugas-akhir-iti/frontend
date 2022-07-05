import React from "react";
import InputBox from "../components/inputBox";
import CategoryCard from "../components/categoryCard";
import MainButton from "../components/mainButton";


function InfoProfileLayout() {
    return (
        <div>
            <form>
                <div className="">
                    <div className="col-12 mt-2 text-center">
                        <button type="">
                            <img src="/kamera.png" alt="" />

                        </button>
                    </div>

                    <div className="col-12 mt-2">
                        <label>Nama*</label>
                        <InputBox
                            type="text"
                            name="nama"
                            className="form-control mt-2"
                            placeholder="Nama"
                        />
                    </div>
                    <div className="col-12 mt-2">
                        <label>Kota</label>
                        <select
                            className="form-select mt-2"
                            aria-label="Default select example"
                            style={{
                                padding: "12px 16px",
                                border: "1px solid #D0D0D0",
                                borderRadius: "16px",
                                display: "flex"
                            }}
                        >
                            <option value="">Pilih Kota</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                    </div>
                    <div className="col-12 mt-2">
                        <label>Alamat</label>
                        <textarea
                            className="form-control mt-2"
                            name=""
                            rows="2"
                            placeholder="Contoh: Jalan Ikan Hiu 33"
                            style={{
                                padding: "12px 16px",
                                border: "1px solid #D0D0D0",
                                borderRadius: "16px",
                                background: "#FFFFFF",
                                display: "flex"
                            }}
                        ></textarea>
                    </div>
                    <div className="col-12 mt-2">

                        <label>No Handphone*</label>
                        <InputBox
                            type="text"
                            name="nama"
                            className="form-control mt-2"
                            placeholder="Contoh: +6283180217394"
                        />
                    </div>

                    <div className="col-12 mt-5 mb-5 fw-bold">
                        <div className="start-0 end-0 d-flex">
                            <CategoryCard
                                className="p-3 flex-grow-1"
                                text="Simpan"
                                rad="16"
                            />
                        </div>
                    </div>
                </div>
            </form>

        </div >

    );
}

export default InfoProfileLayout;