//copy by checkout
import Head from "next/head";
import React, {useState} from "react";
import CategoryCard from "../../components/categoryCard";
import MainLayout from "../../layout/mainLayout";
import useResize from "../../hooks/useResize";
import CartLayoutDekstop from "../../layout/cartLayoutDekstop";
import CartLayoutMobile from "../../layout/cartLayoutMobile";
import ListProduct from "../../components/listProduct";
import { GetToken } from "../../utils/getToken";
import axios from "axios";
import { useRouter } from "next/router";
const API = process.env.NEXT_PUBLIC_API_ENDPOINT;
import { ToastContainer, toast } from "react-toastify";
import MobileLayout from "../../layout/mobileLayout";


export async function getServerSideProps(context) {
    const id = context.query.id
    
    let user = null;
    let allcookie = context.req.headers.cookie || "   ";
    let token = GetToken(allcookie);
    let carts = [];
  
    const res_cart = await axios({
      method: `get`,
      url : `${API}/carts/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    carts = res_cart.data.cart;
    
    //get price
    let getPrice = 0
    carts.map((cart)=>{
      cart.product_cart.map((data)=>(
        getPrice += data.product_price*data.cart_qty
      ))
    })
    

    try {  
      // Users
      const res_user = await axios({
        method: `get`,
        url: `${API}/users`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      user = res_user.data.data;
    
    } catch (error) {
      console.log(error);
    }
    return {
      props: {
        token,
        user,
        carts,
        getPrice,
        id
      },
    };
  }

function Cart({token, user, carts, getPrice, id}){
  // console.log(id)
  const screen = useResize();
  const router = useRouter()

  // cart length
  let cartLength = 0;
  carts.map((data)=>{
    cartLength+=data.product_cart.length
  })

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

  const handleCheckout = async(e) => {
    e.preventDefault();

    if(user.user_phone != null 
      && user.user_province != null
      && user.user_regency != null
      && user.user_address !=null
      && user.user_image != null){
      const order = await axios({
        method: "post",
        url: `${API}/orders`,
        data: {"order_price":getPrice},
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": `multipart/form-data`,
        },
      });

      if(id != null){
        carts[0].product_cart.map(async(data)=>(
        await axios({
          method: "post",
          url: `${API}/orders/order-detail`,
          data: {
            "order_detail_qty": data.cart_qty,
            "product_id":  data.product_id,
            "order_id":  order.data.id
          },
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `multipart/form-data`,
          },
        }),

        await axios({
          method: "delete",
          url: `${API}/carts/${data.cart_id}`,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `multipart/form-data`,
          },
        })
      ))
          
        notify("Sukses Order")
        setTimeout(() => {
          router.replace("/transaction")
        }, 2500)

        console.log(order.data.id)
      
      }else{
        notify("Sukses Order")
      }
    }else{
      notify("Lengkapi Profile")
      setTimeout(() => {
        router.replace("/info-profile")
      }, 2500)
    }
  }

  
  const handleDelete = async (e) => {
    const id = e.target.value;
    e.preventDefault();
    try {
      await axios({
        method: `delete`,
        url: `${API}/carts/${id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      notify("Success Delete");
      setTimeout(() => {
        router.reload()
      },2500)

    } catch (error) {
      console.log(error);
  }
}

  let information = (
    <div
      className="p-4 mb-2"
      style={{
        boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
        borderRadius: "1rem",
        backgroundColor: "#fafafa",
      }}
    >
      {screen.md ? (
      <>
      <h4>Ringkasan Belanja</h4>
      <p className="p-0 mb-2">Total Harga</p>
      <h4>Rp. {getPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h4>
        <div className="start-0 end-0 d-flex mt-4">
          <CategoryCard
            className="py-3 flex-grow-1"
            text="Bayar"
            rad="16"
            fontSize="25px"
            onClick={handleCheckout}
          />
        </div>
      </>
      ) : (
        <>
          <div className="d-flex flex justify-content-between">
            <h5 className="h5-0 mb-2">Total Harga</h5>
            <h5>Rp. {getPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h5>
            </div>
        </>
      )}
    </div>
  );
  let product = (
    <>  
        <div
            className="d-flex flex-column p-4"
            style={{
                boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
                borderRadius: "1rem",
            }}
            >
            
            {Object.keys(carts).map((key)=>(
            <>
                <div className="d-flex flex-row gap-3 align-items-center">
                    <label>
                        <div className="d-flex flex-column">
                        <h5 className="mb-0">{carts[key].product_owner_name}</h5>
                        <p className="p-0">{carts[key].product_owner_regency}</p>
                        </div>
                    </label>
                </div>
  
              {carts[key].product_cart.map((data)=>(
              <div className="ms-0 d-flex flex-column">
                  <ListProduct
                    productName={data.product_name} 
                    productStock={data.product_stock} 
                    productPrice={data.product_price} 
                    productImage={data.product_image} 
                    minOrder={data.product_min_order}
                    quantity={data.cart_qty}
                    handleDelete={handleDelete}
                    cart_id={id}
                  />
              </div>
              ))}
              <hr 
                  style={{
                  height:"4px",
                  borderWidth:"0",
                  color:"gray",
                  backgroundColor:"gray",
                  }}
              />
            </>
            ))}


        </div>
    </>
  );

  let address = (
    <div
      className="p-3 d-flex flex-column"
      style={{
        boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
        borderRadius: "1rem",
      }}
    >
      <h4>Alamat Pengiriman</h4>
      <hr 
        style={{
          height:"3px",
          borderWidth:"0",
          color:"gray",
          backgroundColor:"gray",
        }}
      />
      <h5>{user.user_name} (Pasar)</h5>
      <p className="mt-1 mb-1">
        {user.user_phone}
      </p>
      <p style={{width: "23rem"}}>
        {user.user_address} ,{user.user_regency}, {user.user_province}
      </p>
    </div>
  );

  let attention = (
    <div
      className="p-3 d-flex flex-column"
      style={{
        boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
        borderRadius: "1rem",
        backgroundColor: "#FFB802",
      }}
    >
      <h5 style={{fontWeight: "700",}}>Perhatian</h5>
      <p 
        className="p-0 mb-0" 
        style={{fontSize:"1.1rem", fontWeight:"500"}}>
          Produk yang dibeli belum termasuk ongkos kirim. Untuk ongkos kirim hubungi penjual setelah menekan tombol bayar.
      </p>
    </div>
  );

  let button = (
    <>
      <CategoryCard
          className="p-3 flex-grow-1"
          text="Bayar"
          rad="16"
          onClick={handleCheckout}
      />
    </>
  );

  return(
        <>
            <Head>
                <title>Checkout</title>
                <meta name="description" content="Daftar barang jual saya" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            {screen.md ? (
            <MainLayout user={user}>
              <div className="max-width container-fluid p-0">
                <i
                  onClick={() => router.replace("/cart")}
                  style={{ cursor: "pointer"}}
                  className="bi bi-arrow-left fs-3 ms-3"
                ></i>
                <CartLayoutDekstop
                  information={information}
                  product={product}
                  attention={attention}
                  address={address}
                  pageTitle={"Checkout"}
                />
              </div>
            </MainLayout>
              ) : (
            <MobileLayout user={user} cartLength={cartLength}>
              <CartLayoutMobile
                information={information}
                product={product}
                button={button}
                attention={attention}
                address={address}
                pageTitle={"Checkout"}
              />
            </MobileLayout>
            )}
              
            
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
        </>
    )
}

export default Cart;