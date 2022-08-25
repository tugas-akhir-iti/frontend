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
import MobileLayout from "../../layout/mobileLayout";
const API = process.env.NEXT_PUBLIC_API_ENDPOINT;
import { ToastContainer, toast } from "react-toastify";


export async function getServerSideProps(context) {
    
    let user = null;
    let allcookie = context.req.headers.cookie || "   ";
    let token = GetToken(allcookie);
    let carts = [];
  
    const res_cart = await axios({
      method: `get`,
      url : `${API}/carts`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    carts = res_cart.data.cart;
  
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
        carts
      },
    };
  }

function Cart({token, user, carts}){
  const screen = useResize();
  const router = useRouter()
  const [total, setTotal] = useState(0)
  const [productOwnerId, setProductOwnerId] = useState(null)

  // cart length
  let cartLength = 0;
  carts.map((data)=>{
    cartLength+=data.product_cart.length
  })

  const handleBuy = async(e) => {
    if(productOwnerId != null){
      router.replace(`/checkout/${productOwnerId}`);
    }
  }

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
  
  const handleCart = e => {
    const index = e.target.value; 
    
    setProductOwnerId(carts[index].product_owner_id)

    let get_price = 0
    carts[index].product_cart.map((data)=>(
      get_price += data.product_price*data.cart_qty
    ))
    
    setTotal(get_price)
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
      notify("Item berhasil di hapus")
      setTimeout(() => {
        router.reload();
      }, 2500);
    } catch (error) {
      console.log(error);
  }
}

  let information = (
    <div
      className="p-3 mb-2"
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
      <h4>Rp. {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h4>
        <div className="start-0 end-0 d-flex mt-4">
          <CategoryCard
            className="py-3 flex-grow-1"
            text="Beli"
            rad="16"
            fontSize="25px"
            onClick={handleBuy}
          />
        </div>
      </>
      ): (
        <>
          <div className="d-flex flex justify-content-between">
            <h5 className="h5-0 mb-2">Total Harga</h5>
            <h5>Rp. {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}</h5>
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
                    <input className="mb-2" style={{width:"17px", height:"17px"}}  type="radio" value={key} onChange={handleCart} name="checkProduct"/>
                    <label>
                        <div className="d-flex flex-column">
                        <h5 className="mb-0">{carts[key].product_owner_name}</h5>
                        <p className="p-0">{carts[key].product_owner_regency}</p>
                        </div>
                    </label>
                </div>
  
              {carts[key].product_cart.map((data)=>(
              <div className="ms-4 d-flex flex-column">
                  <ListProduct
                    productName={data.product_name} 
                    productStock={data.product_stock} 
                    productPrice={data.product_price} 
                    productImage={data.product_image} 
                    minOrder={data.product_min_order}
                    quantity={data.cart_qty}
                    handleDelete={handleDelete}
                    cart_id={data.cart_id}
                    token={token}
                    // editCartPopUp={handleEditCart}
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

  let button = (
    <>
      <CategoryCard
          className="p-3 flex-grow-1"
          text="Beli"
          rad="16"
          onClick={handleBuy}
      />
    </>
  );

  return(
    <>
      <Head>
        <title>Keranjang</title>
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
        <MainLayout user={user} cartLength={cartLength}>
          <div className="max-width container-fluid p-0">
            <CartLayoutDekstop
              pageTitle={"Keranjang"}
              information={information}
              product={product}
            />
          </div>
        </MainLayout>
      ) : (
        <MobileLayout user={user} cartLength={cartLength}>
          <CartLayoutMobile
            pageTitle={"Keranjang"}
            information={information}
            product={product}
            button={button}
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