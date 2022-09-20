import React from "react";
import MainModalLayout from "../../layout/mainModalLayout";
import CategoryCard from "../categoryCard";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const API = process.env.NEXT_PUBLIC_API_ENDPOINT;



export default function AddStatusOrderPopUp({
  token,
  setCategoryState,
  onClick,
  idOrder,
  pasarId
}) {
  const router = useRouter();
  const [orderStatusId, setOrderStatusId] = useState(null);

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

    if (orderStatusId != null) {
        // console.log(orderStatusId);
      try {
        await axios({
          method: "put",
          url: `${API}/orders/${idOrder}`,
          data: {
            "status_id": orderStatusId,
            "user_id": pasarId
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `multipart/form-data`,
          },
        });

        notify("Sukses Ubah Status Order")
        setTimeout(() => {
          router.reload()
        }, 2500);
        setCategoryState()
      } catch (error) {
        console.log(error.response);
      }
    } else {
      notify("Pilih status order terlebih dahulu")
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setOrderStatusId(value);
  };

  return (
    <MainModalLayout
      onClick={onClick}
      title={`Ubah Status Order`}
      description={`Ubah status order, agar pembeli mengetahui status order produk yang di beli.`}
    >

      <form onSubmit={handleSubmit} className="d-flex flex-column my-2">
        <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="Diterima" value={2} onChange={handleChange}/>
            <label className="form-check-label" for="Diterima">
                Diterima
            </label>
        </div>
        <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="Dikirim" value={3} onChange={handleChange}/>
            <label className="form-check-label" for="Dikirim">
                Dikirim
            </label>
        </div>
        <div className="form-check">
            <input className="form-check-input" type="radio" name="flexRadioDefault" id="Selesai" value={4} onChange={handleChange}/>
            <label className="form-check-label" for="Selesai">
                Selesai
            </label>
        </div>
        
        <CategoryCard
          className={"py-2 my-2"}
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
