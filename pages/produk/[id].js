import Head from "next/head";
import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
import CategoryCard from "../../components/categoryCard";
import OwnerCard from "../../components/ownerCard";
import MainLayout from "../../layout/mainLayout";
import ProdukMobileLayout from "../../layout/produkMobile";
import useResize from "../../hooks/useResize";
import ProdukDesktopLayout from "../../layout/produkDesktop";

export async function getServerSideProps(context) {
  let user = context.query.user
  const API = process.env.NEXT_PUBLIC_API_ENDPOINT;
  console.log(context.query.id);
  let product = []
  try{
    const res = await axios.get(API + "/products/" + context.query.id);
    product = res.data.data;
  }catch(error){
    console.log(error);
  }
  return {
    props: {
      user,
      product
    },
  };
}

function Produk({ user, product }) {
  const screen = useResize();

  let images = (
    <img
      className="w-100"
      style={{ borderRadius: "1rem" }}
      src={product.product_image}
      alt="carouselproduk"
    />
  );
  let button = (
    <CategoryCard
      className="p-3 flex-grow-1"
      text="Saya Tertarik dan Ingin Nego"
      rad="16"
    />
  );
  let owner = (
    <OwnerCard
      foto={product.User.user_image}
      fotoalt="fotoalt"
      isOwner={false}
      nama={product.User.user_name}
      kota={product.User.user_regency}
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
      <p className="p-0 mb-2">{product.Category.category_name}</p>
      <h5>Rp {product.product_price}</h5>
      {screen.md && (
        <div className="start-0 end-0 d-flex">
          <CategoryCard
            className="p-3 flex-grow-1"
            text="Saya Tertarik dan Ingin Nego"
            rad="16"
          />
        </div>
      )}
    </div>
  );
  let description = (
    <div
      className="p-3"
      style={{
        boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
        borderRadius: "1rem",
      }}
    >
      <b>Deskripsi</b>
      <p className="mb-0 mt-2">{product.product_description}</p>
    </div>
  );
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
            />
          ) : (
            <ProdukMobileLayout
              images={images}
              information={information}
              owner={owner}
              description={description}
              button={button}
            />
          )}
        </div>
      </MainLayout>
    </>
  );
}

export default Produk;
