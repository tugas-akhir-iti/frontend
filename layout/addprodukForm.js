import React from "react";
import InputBox from "../components/inputBox";
import CategoryCard from "../components/categoryCard";
import MainButton from "../components/mainButton";

function AddProdukLayout() {
    return (
        <div>
            <form>
                <div className="p-3 d-flex flex-column">
                    <div className="col-12 mt-2">

                        <label>Nama Produk</label>
                        <InputBox
                            type="text"
                            name="nama_produk"
                            className="form-control mt-2"
                            placeholder="Nama Produk"
                        />
                    </div>
                    <div className="col-12 mt-2">
                        <label>Harga Produk</label>
                        <InputBox
                            type="text"
                            name="harga"
                            className="form-control mt-2"
                            placeholder="Rp 0,00"
                        />
                    </div>
                    <div className="col-12 mt-2">
                        <label>Kategori</label>
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
                        <label>Foto Produk</label>
                        <button
                            className="flex-fill d-flex flex-column justify-content-center rounded mt-2"
                            style={{
                                borderStyle: "dashed",
                                borderWidth: "2px",
                                borderColor: "lightgray",
                                color: "gray",
                                width: "96px",
                                height: "96px"
                            }}>
                            <i
                                className="bi bi-plus mx-auto"
                                style={{ fontSize: "2rem" }}
                            ></i>

                        </button>
                    </div>
                    <div className="col-12 mt-5 mb-5 fw-bold">
                        <div className="d-flex flex-row gap-2">
                            <MainButton
                                className="p-3 flex-grow-1 text-center"
                                text="Preview"
                                rad="16"
                            />
                            <CategoryCard
                                className="p-3 flex-grow-1"
                                text="Terbitkan"
                                rad="16"
                            />
                        </div>
                    </div>
                </div>
            </form>
        </div >

    );
}

export default AddProdukLayout;