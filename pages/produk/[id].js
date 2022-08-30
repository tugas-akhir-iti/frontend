import Head from "next/head";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CategoryCard from "../../components/categoryCard";
import OwnerCard from "../../components/ownerCard";
import MainLayout from "../../layout/mainLayout";
import ProdukMobileLayout from "../../layout/produkMobile";
import useResize from "../../hooks/useResize";
import ProdukDesktopLayout from "../../layout/produkDesktop";
import { GetToken } from "../../utils/getToken";
import MainButton from "../../components/mainButton";
import AddCartPopUp from "../../components/popup/addCartPopUp";
import AddStockPopUp from "../../components/popup/addStockPopUp";
import QuestionBuyer from "../../components/questionBuyer";
import QuestionSeller from "../../components/questionSeller";
import Link from 'next/link';
import styles from "../../styles/Home.module.css"
import MobileLayout from "../../layout/mobileLayout";
import { ToastContainer, toast } from "react-toastify";


const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function getServerSideProps(context) {
  let user = null;
  let allcookie = context.req.headers.cookie || "   ";
  let token = GetToken(allcookie);
  let product = [];
  let questions = [];
  let carts = [];
  let notifications=[]

  const res_questions = await axios({
    method: "get",
    url : `${API}/products/questions/${context.query.id}`
  })
  questions = res_questions.data.data;

  try {
    
    // Products
    const res = await axios.get(API + "/products/" + context.query.id);
    product = res.data.data;

    // Users
    const res_user = await axios({
      method: `get`,
      url: `${API}/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user = res_user.data.data;

    // carts
    const res_cart = await axios({
      method: `get`,
      url : `${API}/carts`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    carts = res_cart.data.cart;

    //notif
    const res_notifications = await axios({
      method: `get`,
      url: `${API}/orders/notification`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    notifications = res_notifications.data.notif;
    
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      token,
      user,
      product,
      questions,
      carts,
      notifications,
    },
  };
}

function Produk({ token, user, product, questions, carts, notifications }) {
  
  console.log(notifications);
  const screen = useResize();
  const router = useRouter();
  const [addCartPopup, setAddCartPopup] = useState(false);
  const [addStockPopUp, setAddStockPopUp] = useState(false);
  const [question, setQuestion] = useState("");
  const handleAddCart = () => setAddCartPopup((addCartPopup =! addCartPopup));
  const handleAddStock = () => setAddStockPopUp((addStockPopUp =! addStockPopUp));
  let isOwner = false;

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

  // cart length
  let cartLength = 0;
  carts.map((data)=>{
    cartLength+=data.product_cart.length
  })

  // Sum questions
  let sum = 0;
  for(let i = 0; i < questions.length; i++){sum += 1}

  if (user != null && product.user_id == user.user_id) {
    isOwner = true;
  }

  const handleEdit = async (e) => {
    router.replace("/update-produk/"+product.id);
  };

  const handleDelete = async (e) => {
    console.log("Deleting item...");
    e.preventDefault();
    try {
      await axios({
        method: `delete`,
        url: `${API}/products/${product.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notify("Item berhasil di hapus")
      setTimeout(() => {
        router.replace("/account/login");
      }, 2500);
    } catch (error) {
      console.log(error);
    }

    router.replace("/seller");
  };

  const handleQuestion = async (e) => {
    // console.log(question, product.id);
    e.preventDefault();
    
    const data = new FormData();
    data.append("product_id", product.id);
    data.append("question", question);
    if (token) {
      try {
        await axios({
          method: "post",
          url: `${API}/products/questions`,
          data: data,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": `multipart/form-data`,
          },
        });
        router.reload();
      } catch (error) {
        console.log(error.response);
      }
    } else {
      notify("Login terlebih dahulu")
      setTimeout(() => {
        router.replace("/account/login");
      }, 2500);
    }
  };

  let images = (
    <img
      className="w-100"
      style={{ borderRadius: "1rem" }}
      src={product.product_image}
      alt="carouselproduk"
    />
  );
  let button = (
    <>
      {isOwner ? (
        <div className="d-flex flex-row gap-2" style={{ width: "100%" }}>
          <MainButton
            className="p-3 flex-grow-1 text-center bg-white"
            text="Edit"
            rad="16"
            onClick={(e)=>handleEdit(e)}
          />
           <CategoryCard
              onClick={(e) => handleAddStock(e)}
              className="p-3 flex-grow-1"
              text="Tambah Stok"
              rad="16"
            />
          <button
            onClick={(e) => handleDelete(e)}
            className={"p-3 flex-grow-1"}
            style={{
              color: "white",
              backgroundColor: "red",
              borderRadius: `16px`,
            }}
          >
            <i className={`bi bi- mx-auto`} style={{ fontSize: "1.5rem" }}></i>
            <p className="m-0 text-center">Delete</p>
          </button>
        </div>
      ) : (
        <CategoryCard
          className="p-3 flex-grow-1"
          text="Tambahkan Keranjang"
          rad="16"
          onClick={handleAddCart}
        />
      )}
    </>
  );
  let owner = (
    <Link 
    href={{pathname: "seller/[id]"}}
    as={`seller/${product.user_id}`}
    >
      <a className={styles.produk} key={product.id}>
        <OwnerCard
        foto={product.user_image}
        fotoalt="fotoalt"
        isOwner={isOwner}
        nama={product.user_name}
        kota={product.user_regency}
        />
      </a>
    </Link>
  );
  let information = (
    <div
      className="p-3"
      style={{
        boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
        borderRadius: "1rem",
      }}
    >
      <h4>{product.product_name}</h4>
      <p className="p-0 mb-0">Stok {product.product_stock} kg</p>
      <p className="p-0 mb-2">Minimal Pembelian {product.product_min_order} kg</p>
      <h5>
        Rp{" "}
        {product.product_price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
      </h5>
      {screen.md && (
        <div className="start-0 end-0 d-flex">
          {isOwner ? (
            <div className="d-flex flex-column gap-2" style={{ width: "100%" }}>
              <MainButton
                onClick={(e) => handleEdit(e)}
                className="p-3 flex-grow-1 text-center bg-white"
                text="Edit"
                rad="16"
              />
              <CategoryCard
                onClick={(e) => handleAddStock(e)}
                className="p-3 flex-grow-1"
                text="Tambah Stok"
                rad="16"
              />
              <button
                onClick={(e) => handleDelete(e)}
                className={"p-3 flex-grow-1"}
                style={{
                  color: "white",
                  backgroundColor: "red",
                  borderRadius: `16px`,
                }}
              >
                <i
                  className={`bi bi- mx-auto`}
                  style={{ fontSize: "1.5rem" }}
                ></i>
                <p className="m-0 text-center">Delete</p>
              </button>
            </div>
          ) : (
            <CategoryCard
              className="p-3 flex-grow-1"
              text="Tambahkan Keranjang"
              rad="16"
              onClick={handleAddCart}
            />
          )}
        </div>
      )}
    </div>
  );
  let description = (
    <div
      className="p-4"
      style={{
        boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
        borderRadius: "1rem",
      }}
    >
      <b>Deskripsi</b>
      <p className="mb-0 mt-2">{product.product_description}</p>
    </div>
  );
  let questionBuyer = (
    <div
      className="p-3 d-flex flex-column "
      style={{
        boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
        borderRadius: "1rem",
      }}
    >
      <div className="d-flex flex-row justify-content-between mb-3">
        {questions != null ? (
        <h4>Tanya Produk ({sum})</h4>
        ) : (
          <h4>Tanya Produk (0)</h4>
        )}

        {user == null  || user.role_id == 2 ? 
          <Link href="#value-question">
            <MainButton
              className="p-2"
              text="Tanya Produk"
              rad="5"
            />
          </Link>
        : null
        }

      </div>

      {/* Question buyer condition */}

      {questions != null && user == null || user.role_id == 2 ? questions.map((data)=>(
      <>     
        <QuestionBuyer 
          question={data.question} 
          answare={data.answare} 
          user_name_question={data.user_name_question} 
          user_image_question={data.user_image_question} 
          user_name_product={data.user_name_product}
          user_image_product={data.user_image_product}
          createdAt={data.createdAt} 
          updatedAt={data.updatedAt}
        />

      </>
      )) : null}

      {user == null  || user.role_id == 2 ? 
      <>
        <textarea
          style={{
            boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
            borderRadius: "0.3rem", 
            border:"none"}} 
          className="mt-4 mb-2 p-2" 
          placeholder="Tulis pertanyaan"
          type="textarea" 
          id="value-question"
          name="value-question"
          onChange={e=>{setQuestion(e.currentTarget.value)}}
        />
        
        <div 
          className="d-flex justify-content-end">
          <CategoryCard
            className="p-2 ps-4 pe-4"
            text="Kirim"
            rad="5"
            onClick={handleQuestion}
          />
        </div>
      </>
      : null }

      {/* Question Seller Condition */}
      {questions != null && user != null && user.role_id == 1 ? questions.map((data)=>(
          <>     
            <QuestionSeller 
              id={data.id}
              question={data.question} 
              answare={data.answare} 
              user_name_question={data.user_name_question} 
              user_image_question={data.user_image_question} 
              user_name_product={data.user_name_product}
              user_image_product={data.user_image_product}
              createdAt={data.createdAt} 
              updatedAt={data.updatedAt}
              token={token}
            />
          </>
          )) : null}
    </ div>
  )
  return (
    <>
      <Head>
        <title>Produk</title>
        <meta name="description" content="Produk Detail" />
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
            <div className="max-width container-fluid p-0">
            <ProdukDesktopLayout
              images={images}
              information={information}
              owner={owner}
              description={description}
              button={button}
              questionBuyer={questionBuyer}
            />
            </div>
          </MainLayout>
          ) : screen.sm && user != null && user.role_id == 1 ? (
            <MainLayout user={user} notifications={notifications}>
              <ProdukMobileLayout
                images={images}
                information={information}
                description={description}
                button={button}
                questionBuyer={questionBuyer}
                // owner={owner}
              />
            </MainLayout>
          ) : (
            <MobileLayout user={user} cartLength={cartLength} notifications={notifications}>
              <ProdukMobileLayout
                images={images}
                information={information}
                owner={owner}
                description={description}
                button={button}
                questionBuyer={questionBuyer}
              />
            </MobileLayout>
          )}
        
        {addCartPopup && (
          <AddCartPopUp
            token={token}
            onClick={handleAddCart}
            // stateChanger={handleAddCart}
            product_name={product.product_name}
            product_image={product.product_image}
            product_price={product.product_price}
            product_min_order={product.product_min_order}
            product_stock={product.product_stock}
            product_id={product.id}
            user={user}
          />
        )}

        {addStockPopUp && (
          <AddStockPopUp
            token={token}
            onClick={handleAddStock}
            stateChanger={handleAddStock}
            product_name={product.product_name}
            product_image={product.product_image}
            product_price={product.product_price}
            product_min_order={product.product_min_order}
            product_stock={product.product_stock}
            product_id={product.id}
            user={user}
          />
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
  );
}

export default Produk;
