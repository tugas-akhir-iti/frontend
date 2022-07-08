import React, {useEffect, useState} from "react";
import InputBox from "../components/inputBox";
import CategoryCard from "../components/categoryCard";
import MainButton from "../components/mainButton";
import axios from "axios";


function InfoProfileLayout() {
  const [provinces, setProvinces]=useState([]);
  const [regencies, setRegencies]=useState([]);
  // const [provinceCode, setProvinceCode]=useState("");

  // useEffect(()=>{
  //   getProvince();
  // })

  const getProvince = async(e)=>{
    const res_province = await axios.get("https://svc-eterno-rails.herokuapp.com/api/v1/provinces")
    setProvinces(res_province.data.data);
  }

  async function getRegency(provinceCode){
    const res_regency = await axios.get(`https://svc-eterno-rails.herokuapp.com/api/v1/regencies?province_code=${provinceCode}`)
    setRegencies(res_regency.data.data);
  }

  //run get province
  getProvince()

  // if(provinceCode!=""){
  //   console.log("not null regency")
  // }

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
            <label>Provinsi</label>
            <select
              className="form-select mt-2"
              aria-label="Default select example"
              style={{
                padding: "12px 16px",
                border: "1px solid #D0D0D0",
                borderRadius: "16px",
                display: "flex",
              }}
            >
              {/* <option value="">Pilih Provinsi</option> */}
              {provinces.map((province)=>(
                // <option value={province.name} key={province.id} onClick={getRegency(province.province_code)}>{province.name}</option>
                <option value={province.name} key={province.id}>{province.name}</option>
              ))}
            </select>
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
                display: "flex",
              }}
            >
              <option value="">Pilih Kota</option>
              {regencies.map((regency)=>(
                <option value={regency.name} key={regency.id} >{regency.name}</option>
              ))}
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
                display: "flex",
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
    </div>
  );
}

export default InfoProfileLayout;
