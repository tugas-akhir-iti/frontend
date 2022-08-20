// import Router, { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import MainLayout from "../../layout/mainLayout";
import useResize from "../../hooks/useResize";
import ButtonMasuk from "../../components/buttonMasuk";
import Link from "next/link";
import ItemCard from "../../components/itemCard";
import styles from "../../styles/Home.module.css";
import { useRouter } from "next/router";
import { GetToken } from "../../utils/getToken";
import React, { useEffect, useState } from "react";
import MobileLayout from "../../layout/mobileLayout";
import Search from "../../components/search";
const API = process.env.NEXT_PUBLIC_API_ENDPOINT; 

export async function getServerSideProps(context) {
  
    let user = null;
    let allcookie = context.req.headers.cookie || "   ";
    let token = GetToken(allcookie); 
    let query = context.query.keyword;
    let product = [];

    try {
      // Products
      const res = await axios.get(API + "/products/search/all?name="+query);
      product = res.data.data;
  
      // Users
      const res_user = await axios({
        method: `get`,
        url: `${API}/users`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      user = res_user.data;
    
    } catch (error) {
      console.log(error);
    }

    return {
      props: {
        user,
        product
      },
    };
}

function SearchPage({user, product}){
    
    const screen = useResize();
    // console.log(product);
    return(
        <>
        {/* {product == [] ? (<p>Kosong</p>):(null)} */}
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
          {/* {product == "" ? (<h1>Produk Null</h1>) : (<h1>Produk Ada</h1>)} */}
        {screen.md ? (
        <MainLayout user={user}>
          <div className="row">
            {product != "" ? (
            <div className="col-10 offset-1">
              <div className="row d-flex px-1 mt-2">
                {product.map((data) => (
                  <div className="col-2 mt-2 mx-0 p-1">
                  <Link
                    href={{
                    pathname: "../produk/[id]"}}
                    as={`../../produk/${data.id}`}
                  >
                    <a className={styles.produk} key={data.id}>
                      <ItemCard
                        name={data.product_name}
                        price={data.product_price}
                        regency={data.user_regency}
                        stock={data.product_stock}
                        image={data.product_image}
                      />
                    </a>
                  </Link>
                </div>
                ))}
              </div>
            </div>
            ) : ( 
            <div className="text-center d-flex flex-column justify-items-center py-5 ">
              <img
                className="mx-auto"
                src="empty-seller.svg"
                alt="No Item Available"
                style={{ width: "20%" }}
              />
              <p className="m-0 pt-5" style={{color:"gray"}}>
                Maaf Produk yang dicari tidak ditemukan.
              </p>
            </div>
            )}
          </div>
        </MainLayout>
        ) : (
        <MobileLayout user={user}>
          {product !== "" ? (
          <div className="row d-flex px-3">
              {product.map((data) => (
                <div className="col-6 col-md-4 mt-3">
                  <Link
                      href={{
                        pathname: "/produk/[id]",
                      }}
                      as={`produk/${data.id}`}
                    >
                      <a
                        className={styles.produk}
                        key={data.id}
                      >
                        <ItemCard
                          name={data.product_name}
                          price={data.product_price}
                          regency={data.user_regency}
                          stock={data.product_stock}
                          image={data.product_image}
                        />
                      </a>
                    </Link>
                </div>
              ))}
          </div>
          ):(
            <div className="row d-flex px-3">
              <h1>Kosong</h1>
            </div>
          )}
        </ MobileLayout >
        )}
        </>
    );
}

export default SearchPage;