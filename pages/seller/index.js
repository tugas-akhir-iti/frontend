import React from "react";
import Head from "next/head";
import axios from "axios";
import CategoryCard from "../../components/categoryCard";
import OwnerCard from "../../components/ownerCard";
import MainLayout from "../../layout/mainLayout";
import useResize from "../../hooks/useResize";
import ListSeller from "../../components/sellerViewOption/listSeller";
import GridSeller from "../../components/sellerViewOption/gridSeller";

export async function getServerSideProps({ req, res }) {
  const API = process.env.NEXT_PUBLIC_API_ENDPOINT;
  let user = null;
  let allcookie = req.headers.cookie || "   ";
  let cookielist = allcookie.split("; ");
  let token = "";
  cookielist.forEach((element) => {
    if (element.startsWith("token=")) {
      token = element.substring(6, element.length);
    }
  });
  let products = []

  try {
    const res_user = await axios({
      method: `get`,
      url: `${API}/users`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user = res_user.data.data;

    const res_products = await axios({
      method: `get`,
      url: `${API}/products/user/id`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    products = res_products.data.data;
  } catch (error) {
    console.log(error.response);
  }

  return {
    props: {
      user,
      products
    },
  };
}

export default function DaftarJual({user,products}) {
  const category = [
    ["box", "Semua Produk"],
    ["heart", "Diminati"],
    ["currency-dollar", "Terjual"],
  ];

  const screen = useResize();
  console.log(user);

  return (
    <>
      <Head>
        <title>Daftar Jual Saya</title>
        <meta name="description" content="Daftar barang jual saya" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainLayout user={user}>
        <div className="max-width p-2 d-flex flex-column gap-2">
          <h1 className="">Daftar Jual Saya</h1>

          <OwnerCard
            foto={user.user_image}
            fotoalt={`${user.user_name}'s photo`}
            isOwner={true}
            nama={user.user_name}
            kota={user.user_regency}
          />
        </div>

        <div className={"" + (screen.md ? " max-width" : "")}>
          <div
            className={
              "container-fluid px-0 py-2 m-0" + (screen.md ? " row " : "hidden")
            }
          >
            {screen.md ? (
              <div className="col-4 px-2 py-2 m-0">
                <div
                  className="p-4 sticky-top"
                  style={{
                    boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
                    borderRadius: "1rem",
                  }}
                >
                  <h4>Kategori</h4>
                  <div className="">
                    {category.map((data, index) => (
                      <div
                        key={index}
                        className="d-flex align-items-center justify-content-between py-2"
                      >
                        <div className="d-flex align-items-center gap-2">
                          <i
                            className={`bi bi-${data[0]}`}
                            style={{ fontSize: "1.5rem" }}
                          ></i>
                          <p className="m-0 p-0">{data[1]}</p>
                        </div>
                        <i
                          className={`bi bi-chevron-right`}
                          style={{ fontSize: "1.5rem" }}
                        ></i>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="container-fluid p-0 ">
                <div
                  className="overflow-auto d-flex gap-2 px-2"
                  style={{ whiteSpace: "nowrap" }}
                >
                  {category.map((data, index) => (
                    <CategoryCard
                      className={"d-flex align-items-center px-3 py-1 gap-2"}
                      key={index}
                      icon={data[0]}
                      text={data[1]}
                      rad="8"
                    />
                  ))}
                </div>
              </div>
            )}
            <div
              className={
                "container-fluid m-0 row p-1 g-2" + (screen.md ? " col-8" : "")
              }
            >
              <GridSeller products={products} user={user}/>
              {/* <ListSeller listsize={0}/> */}
            </div>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
