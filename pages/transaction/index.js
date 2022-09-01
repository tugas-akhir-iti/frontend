//copy by checkout
import Head from "next/head";
import React, { useState, useCallback} from "react";
import CategoryCard from "../../components/categoryCard";
import MainLayout from "../../layout/mainLayout";
import useResize from "../../hooks/useResize";
// import CartLayout from "../../layout/cartLayout";
// import ListProduct from "../../components/listProduct";
import { GetToken } from "../../utils/getToken";
import axios from "axios";
import TransactionDekstopLayout from "../../layout/transactionDekstopLayout";
import TransactionMobileLayout from "../../layout/transactionMobileLayout";
import { useRouter } from "next/router";
import MobileLayout from "../../layout/mobileLayout";
const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function getServerSideProps(context) {
  let user = null;
  let allcookie = context.req.headers.cookie || "   ";
  let token = GetToken(allcookie);
  let orders = [];
  let carts = [];
  let notifications = []
  
   // carts
  const res_cart = await axios({
    method: `get`,
    url : `${API}/carts`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  carts = res_cart.data.cart;

  const res_order = await axios({
      method: `get`,
      url : `${API}/orders`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
  })
  orders = res_order.data.order
  
  const res_user = await axios({
      method: `get`,
      url: `${API}/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
  });
  user = res_user.data.data;

  const res_notifications = await axios({
    method: `get`,
    url: `${API}/orders/notification`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  notifications = res_notifications.data.notif;
  return {
      props: {
          token,
          user,
          orders,
          carts,
          notifications
      },
  };
}

function Transaction({token, user, orders, carts, notifications}){
  const router = useRouter();
  const screen = useResize()

  // cart length
  let cartLength = 0;
  carts.map((data)=>{
    cartLength+=data.product_cart.length
  })

  
  // console.log(orderId)
  

  const handleCancle = async(e) => {
    // console.log(e.target.value)
    const val = e.target.value;
    const splitVal = val.split(",")

    const id = null
    id = splitVal[0]
    if(id != null ){
    try {
        await axios({
          method: "put",
          url: `${API}/orders/${id}`,
          data: {
            "status_id": 5,
            "user_id": splitVal[1],
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `multipart/form-data`,
          },
        });
        router.reload();
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  const handleDoneOrder = async(e) => {
    // console.log(e.target.value)
    const val = e.target.value;
    const splitVal = val.split(",")

    const id = null
    id = splitVal[0]
    if(id != null ){
    try {
        await axios({
          method: "put",
          url: `${API}/orders/${id}`,
          data: {
            "status_id": 4,
            "user_id": splitVal[1],
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `multipart/form-data`,
          },
        });
        router.reload();
      } catch (error) {
        console.log(error.response);
      }
    }
  }

  const handleUploadTransaction = async(e) => {
    console.log(e.target.files[0])
    console.log(e.target.id)

    const ordTransferImage = e.target.files[0]
    const orderId = e.target.id
    
    try {
      await axios({
        method: "put",
        url: `${API}/orders/order-transfer/${orderId}`,
        data: {
          "order_transfer_image": ordTransferImage,
        },
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `multipart/form-data`,
        },
      });
      router.reload();
    } catch (error) {
      console.log(error.response);
    }
  }

    return(
        <>
            <Head>
                <title>Transaction</title>
                <meta name="description" content="Daftar barang jual saya" />
                <link rel="icon" href="/favicon.ico" />
                <script
                  src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
                  integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
                  crossOrigin="anonymous"
                ></script>
                <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
            </Head>

            {screen.md ? (
               <MainLayout user={user} cartLength={cartLength} notifications={notifications}>
              {orders != "" ? (
               <div className="col-8 offset-2 mt-3 d-flex flex-column justify-content-center">
                 <h4 className="ms-2 mb-4">Daftar Transaksi</h4>
                   <TransactionDekstopLayout 
                   orders={orders} 
                   handleUploadTransaction={handleUploadTransaction}
                   handleCancle={handleCancle}
                   handleDoneOrder={handleDoneOrder}
                   user={user}
                   />
               </div> 
              ) : (
              <div className="text-center d-flex flex-column justify-items-center py-5 ">
                <img
                  className="mx-auto"
                  src="list-not-found.png"
                  alt="No Item Available"
                  style={{ width: "20%" }}
                />
                <p className="m-0 pt-5" style={{color:"gray"}}>
                  Pesanan mu masih kosong,
                </p>
                <p className="m-0" style={{color:"gray"}}>
                  ayo tambahkan sekarang.
                </p>
              </div>
              )}
               </MainLayout>
            ):(
              <MobileLayout user={user} cartLength={cartLength} notifications={notifications}>
              {orders != "" ? (
              <TransactionMobileLayout 
                orders={orders} 
                handleUploadTransaction={handleUploadTransaction} 
                handleCancle={handleCancle}
                user={user}
                handleDoneOrder={handleDoneOrder}
                />
              ):(
              <div className="text-center d-flex flex-column justify-items-center py-5 ">
                <img
                  className="mx-auto"
                  src="list-not-found.png"
                  alt="No Item Available"
                  style={{ width: "50%" }}
                />
                <p className="m-0 pt-5" style={{color:"gray"}}>
                  Keranjang mu masih kosong,
                </p>
                <p className="m-0" style={{color:"gray"}}>
                  ayo tambahkan barang.
                </p>
              </div>
              )}
            </MobileLayout>
            )}
           
            
        </>
    )
}

export default Transaction;