import Head from "next/head";
import React from "react";
import CategoryCard from "../../components/categoryCard";
import OwnerCard from "../../components/ownerCard";
import MainLayout from "../../layout/mainLayout";
import ProdukMobileLayout from "../../layout/produkMobile";
import useResize from "../../hooks/useResize";
import ProdukDesktopLayout from "../../layout/produkDesktop";
import { useState } from "react";
import TawarPopUp from "../../components/popup/tawarPopUp";

function Produk({ product_id, product_name, product_description, product_price, product_image, category_name, user_image, user_name, user_regency }) {
  const screen = useResize();
  const [tawarPopup, settawarPopup] = useState(false)

  const handleTawarPopup = async (e) => {
    // alert('false')
    settawarPopup(true);


  };

  let button = (
    <CategoryCard
      className="p-3 flex-grow-1"
      text="Saya Tertarik dan Ingin Nego"
      rad="16"
      onClick={(e) => handleTawarPopup(e)}
    />

  );

  let images = (
    <img
      className="w-100"
      style={{ borderRadius: "1rem" }}
      src={product_image}
      alt="carouselproduk"
    />
  );

  let owner = (
    <OwnerCard
      foto={user_image}
      fotoalt="fotoalt"
      isOwner={false}
      nama={user_name}
      kota={user_regency}
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
      <h4>{product_name}</h4>
      <p className="p-0 mb-2">{category_name}</p>
      <h5>Rp {product_price}</h5>
      {screen.md && (
        <div className="start-0 end-0 d-flex">
          <CategoryCard
            className="p-3 flex-grow-1"
            text="Saya Tertarik dan Ingin Nego"
            rad="16"
            onClick={(e) => handleTawarPopup(e)}
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
      <p className="mb-0 mt-2">
        {product_description}
      </p>
    </div>
  );
  return (
    <>
      <Head>
        <title>Daftar Jual Saya</title>
        <meta name="description" content="Daftar barang jual saya" />
        <link rel="icon" href="/favicon.ico" />
        
        
      </Head>

      <MainLayout>
        <div className="max-width container-fluid p-0">
          {screen.md ? (
            <ProdukDesktopLayout
              images={images}
              information={information}
              owner={owner}
              description={description}

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
        {tawarPopup && <TawarPopUp
          product_name={product_name}
          product_image={product_image}
          product_id={product_id}
          product_price={product_price} />}
      </MainLayout>
    </>
  );
}

export default Produk;
