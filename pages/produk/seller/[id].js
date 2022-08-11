/* eslint-disable @next/next/no-sync-scripts */
import axios from "axios";
import Head from "next/head";
import MainLayout from "../../../layout/mainLayout";
import useResize from "../../../hooks/useResize";
import ButtonMasuk from "../../../components/buttonMasuk";
import Link from "next/link";
import ItemCard from "../../../components/itemCard";
import styles from "../../../styles/Home.module.css";
import { useRouter } from "next/router";
import { GetToken } from "../../../utils/getToken";
import { useEffect } from "react";

export async function getServerSideProps(context) {
  const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

  const id = context.query.id

  let user = null;
  let user_seller = null;
  let allcookie = context.req.headers.cookie || "   ";
  let token = GetToken(allcookie);
  let products = [];

  const res_user_seller = await axios.get(API+"/users/"+id)
    user_seller = res_user_seller.data.data;

  try {
    const res_products = await axios(API+"/products/seller/"+id);
    products = res_products.data.data;

    const res_user = await axios({
      method: `get`,
      url: `${API}/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user = res_user.data.data;
    
    

    // const res_notifications = await axios({
    //   method: `get`,
    //   url: `${API}/users/notifications`,
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });
    // notifications = res_notifications.data.data;
  } catch (error) {
    console.log(error.response);
  }

  return {
    props: {
      user,
      products,
      user_seller
    },
  };
}

export default function Home({
  user,
  products,
  user_seller
}){

  console.log("Seller", user_seller);
  const screen = useResize();
  const router = useRouter();

  useEffect(() => {
    if (user != null && user.role_id == 1) {
      router.replace("/seller");
    }
  });

  return (
    <>
      <Head>
        <title>Rumah Tani</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <script
          src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"
          integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p"
          crossOrigin="anonymous"
        ></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
      </Head>

      {screen.md ? (
        <MainLayout user={user}>
        

        <div className="row">
            <div className="col-10 offset-1">
                    <div
                    className="d-flex flex-row p-3 gap-3 mx-0 mt-4"
                    style={{
                    boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
                    borderRadius: "1rem",
                    }}
                    >
                        <img
                        src={user_seller.user_image}
                        alt="Gambar User Petani"
                        style={{ height: "5rem", borderRadius: "1rem" }}
                        />

                        <div className="d-flex flex-column justify-content-center">
                            <h4 className="m-0">{user_seller.user_name}</h4>
                            <p className="m-0">{user_seller.user_regency}</p>
                        </div>

                        <div className="d-flex flex-column justify-content-center">
                            <p className="m-0">{user_seller.user_address}</p>
                            <p className="m-0">{user_seller.user_regency}, {user_seller.user_province}</p>
                        </div>
                    </div>
                <div className="row d-flex px-1 mt-2">
                    {products.map((product) => (
                    <div className="col-2 mt-2 mx-0 p-1">
                        <Link
                        href={{
                            pathname: "../../produk/[id]",
                        }}
                        as={`../../produk/${product.id}`}
                        >
                        <a className={styles.produk} key={product.id}>
                            <ItemCard
                            name={product.product_name}
                            price={product.product_price}
                            regency={product.user_regency}
                            stock={product.product_stock}
                            image={product.product_image}
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
    )};
    </> 
  )
}