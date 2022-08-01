/* eslint-disable react/jsx-key */
import React from "react";
import Link from "next/link";
import ItemCard from "../components/itemCard";
import UlCategoryLayout from "./ulcategorylayout";
import styles from "../styles/Home.module.css";

function CategoryLayout({
  user,
  products,
  products_sayur,
  products_buah,
  products_rempah,
}) {
  return (
    <>
      <div className="card border-0">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3">Telusuri Kategori</h5>
          <UlCategoryLayout>
            <button
              style={{ borderRadius: "16px" }}
              className="pill active m-2"
              id="pills-semua-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-semua"
              type="button"
              role="tab"
              aria-controls="pills-semua"
              aria-selected="true"
            >
              <i className="bi bi-search"> </i>
              Semua
            </button>

            <button
              style={{ borderRadius: "16px" }}
              className="pill m-2"
              id="pills-sayur-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-sayur"
              type="button"
              role="tab"
              aria-controls="pills-sayur"
              aria-selected="true"
            >
              <i className="bi bi-search"> </i>
              Sayuran
            </button>

            <button
              style={{ borderRadius: "16px" }}
              className="pill m-2"
              id="pills-buah-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-buah"
              type="button"
              role="tab"
              aria-controls="pills-buah"
              aria-selected="true"
            >
              <i className="bi bi-search"> </i>
              Buah
            </button>

            <button
              style={{ borderRadius: "16px" }}
              className="pill m-2"
              id="pills-rempah-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-rempah"
              type="button"
              role="tab"
              aria-controls="pills-rempah"
              aria-selected="true"
            >
              <i className="bi bi-search"> </i>
              Rempah
            </button>
          </UlCategoryLayout>

          {/* tab masing-masing kategori */}
          <div className="tab-content pt-2" id="myTabContent">
            <div
              className="tab-pane fade show active"
              id="pills-semua"
              role="tabpanel"
              aria-labelledby="semua-tab"
            >
              <div className="row d-flex px-1 mt-2">
                {products.map((product) => (
                  <div className="col-2 mt-2 mx-0 p-1">
                    <Link
                      href={{
                        pathname: "/produk/[id]",
                      }}
                      as={`produk/${product.id}`}
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

            <div
              className="tab-pane fade"
              id="pills-sayur"
              role="tabpanel"
              aria-labelledby="sayur-tab"
            >
              <div className="row d-flex px-3 mt-2 ">
                {products_sayur.map((product) => (
                  <div className="col-2 mt-4 mx-0 p-1">
                    <Link
                      href={{
                        pathname: "/produk/[id]",
                      }}
                      as={`produk/${product.id}`}
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
            <div
              className="tab-pane fade"
              id="pills-buah"
              role="tabpanel"
              aria-labelledby="buah-tab"
            >
              <div className="row d-flex px-3 mt-2">
                {products_buah.map((product) => (
                  <div className="col-2 mt-4 mx-0 p-1">
                    <Link
                      href={{
                        pathname: "/produk/[id]",
                      }}
                      as={`produk/${product.id}`}
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

            <div
              className="tab-pane fade"
              id="pills-rempah"
              role="tabpanel"
              aria-labelledby="rempah-tab"
            >
              <div className="row d-flex px-3 mt-2">
                {products_rempah.map((product) => (
                  <div className="col-2 mt-4 mx-0 p-1">
                    <Link
                      href={{
                        pathname: "/produk/[id]",
                      }}
                      as={`produk/${product.id}`}
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
        </div>
      </div>
    </>
  );
}

export default CategoryLayout;
