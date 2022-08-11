//copy by checkout
import Head from "next/head";
import React, { useState, useCallback} from "react";
import CategoryCard from "../../components/categoryCard";
import MainLayout from "../../layout/mainLayout";
import useResize from "../../hooks/useResize";
// import CartLayout from "../../layout/cartLayout";
import ListProduct from "../../components/listProduct";
import { GetToken } from "../../utils/getToken";
import axios from "axios";
import TransactionDekstopLayout from "../../layout/transactionDekstopLayout";
import { useRouter } from "next/router";
const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function getServerSideProps(context) {
  let user = null;
  let allcookie = context.req.headers.cookie || "   ";
  let token = GetToken(allcookie);
  let orders = [];

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

  return {
      props: {
          token,
          user,
          orders
      },
  };
}

function Transaction({token, user, orders}){
  const router = useRouter();
  const [orderId, setOrderId] = useState(null)

  const getOrderId = (id) => {
    setOrderId(id);
  };

  const handleCancle = async(e) => {
    console.log(e.target.value)
    const id = null
    id = e.target.value
    if(id != null ){
    try {
        await axios({
          method: "put",
          url: `${API}/orders/${id}`,
          data: {
            "status_id": 5,
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
    console.log(e.target.value)
    // const ordTransferImage = e.target.files[0];
    // console.log(ordTransferImage);
    // // const orderId = e.target.value
    // console.log(`Id : ${orderId}`)
    // try {
    //   await axios({
    //     method: "put",
    //     url: `${API}/orders/order-transfer/${orderId}`,
    //     data: {
    //       "order_transfer_image": ord_transfer_image,
    //     },
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": `multipart/form-data`,
    //     },
    //   });
    //   router.reload();
    // } catch (error) {
    //   console.log(error.response);
    // }
  }

    return(
        <>
            <Head>
                <title>Transaction</title>
                <meta name="description" content="Daftar barang jual saya" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <MainLayout user={user}>
            <div className="col-8 offset-2 mt-3 d-flex flex-column justify-content-center">
              <i className="bi bi-arrow-left fs-3 pe-5 mb-3"></i>
              <h4 className="ms-2 mb-4">Daftar Transaksi</h4>
                <TransactionDekstopLayout 
                orders={orders} 
                handleUploadTransaction={handleUploadTransaction} 
                getOrderId={getOrderId}
                handleCancle={handleCancle}
                user={user}
                />
            </div> 
            </MainLayout>
            
        </>
    )
}

export default Transaction;