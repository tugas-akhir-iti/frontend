import Head from "next/head";
import React from "react";
import { useRouter } from "next/router";
import CategoryCard from "../../components/categoryCard";
import OwnerCard from "../../components/ownerCard";
import MainLayout from "../../layout/mainLayout";
import ProdukMobileLayout from "../../layout/produkMobile";
import useResize from "../../hooks/useResize";
import ProdukDesktopLayout from "../../layout/produkDesktop";

export const getStaticPaths = async () => {
  const res = await fetch("https://kelompok4-yateam.herokuapp.com/products");
  const response = await res.json();

  // map data to an array of path objects with params (id)
  const paths = response.data.map((product) => {
    return {
      params: { id: product.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch(
    "https://kelompok4-yateam.herokuapp.com/products/" + id
  );
  const response = await res.json();

  return {
    props: { product: response.data },
  };
};

function Produk({ product }) {
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

      <MainLayout>
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
