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
    console.log(product);
    return(
        <> 
        {screen.md ? (
        <MainLayout user={user}>
          <div className="row">
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
          </div>
        </MainLayout>
        ) : (
        <MainLayout user={user}>
        Hallo
        </ MainLayout >
        )}
        </>
    );
}

export default SearchPage;