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
import TawarPopUp from "../../components/popup/tawarPopUp";
import QuestionBuyer from "../../components/questionBuyer";
import QuestionSeller from "../../components/questionSeller";
import Link from 'next/link'
const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

export async function getServerSideProps(context) {
  let user = null;
  let allcookie = context.req.headers.cookie || "   ";
  let token = GetToken(allcookie);
  let product = [];
  let questions = [];

  const res_questions = await axios({
    method: "get",
    url : `http://localhost:3001/products/questions/${context.query.id}`
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
  
  } catch (error) {
    console.log(error);
  }
  return {
    props: {
      token,
      user,
      product,
      questions
    },
  };
}

function Produk({ token, user, product, questions }) {

  const screen = useResize();
  const router = useRouter();
  const [tawarPopup, setTawarPopup] = useState(false);
  const [question, setQuestion] = useState("");
  const handleTawarPopup = () => setTawarPopup((tawarPopup = !tawarPopup));
  let isOwner = false;
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
      alert("Item being deleted. Please wait.");
    } catch (error) {
      console.log(error);
    }

    router.replace("/seller");
  };

  const handleQuestion = async (e) => {
    console.log(question, product.id);
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
      alert("Please Login to continue");
      router.replace("/account/login");
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
        <div className="d-flex flex-column gap-2" style={{ width: "100%" }}>
          <MainButton
            className="p-3 flex-grow-1 text-center bg-white"
            text="Edit"
            rad="16"
            onClick={(e)=>handleEdit(e)}
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
          onClick={handleTawarPopup}
        />
      )}
    </>
  );
  let owner = (
    <OwnerCard
      foto={product.user_image}
      fotoalt="fotoalt"
      isOwner={isOwner}
      nama={product.user_name}
      kota={product.user_regency}
    />
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
              onClick={handleTawarPopup}
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
        <h4>Tanya Produk(12)</h4>

        {user == null  || user.role_id == 2 ? 
          <Link href="#value-question">
            <CategoryCard
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

      {/* Question Seller */}
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
        <title>Daftar Jual Saya</title>
        <meta name="description" content="Daftar barang jual saya" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout user={user}>
        <div className="max-width container-fluid p-0">
          {screen.md ? (
            <ProdukDesktopLayout
              images={images}
              information={information}
              owner={owner}
              description={description}
              button={button}
              isOwner={isOwner}
              questionBuyer={questionBuyer}
            />
          ) : (
            <ProdukMobileLayout
              images={images}
              information={information}
              owner={owner}
              description={description}
              button={button}
              isOwner={isOwner}
              questionBuyer={questionBuyer}
            />
          )}
        </div>
        {tawarPopup && (
          <TawarPopUp
            token={token}
            onClick={handleTawarPopup}
            product_name={product.product_name}
            product_image={product.product_image}
            product_id={product.id}
            product_price={product.product_price}
          />
        )}
      </MainLayout>
    </>
  );
}

export default Produk;
