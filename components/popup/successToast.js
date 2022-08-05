import { ToastContainer, toast } from "react-toastify";
import React from "react";

export default function ToastSuccess(props){

    toast.success(props.title, {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });

    return(
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
    )
}