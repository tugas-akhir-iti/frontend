/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unknown-property */
import React, { useState } from "react";
import Search from "./search";
import { useRouter } from "next/router";
import ButtonMasuk from "./buttonMasuk";
import Link from "next/link";
import cookie from "js-cookie";
// import moment from "moment";

function HeaderMobile({ user, notifications, cartLength }) {
  const router = useRouter();
  const path = router.pathname;

  let mark_as_read = []
  if(notifications != null){
    notifications.map((notification) => {
      mark_as_read.push({
        "id":notification.id,
        "read":notification.mark_as_read,
      })
    }) 
  }

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      cookie.remove("token");
    } catch (error) {
      console.log(error);
    }
    router.replace("/");
  };

  return (
            <div className="d-flex flex-column max-width sticky-top">
              <div className="mb-0 pb-2" style={{backgroundColor: "#fafafa"}}>
                <div className="container-fluid px-0 mb-0 mt-0">
                  <div className="d-flex flex-row gap-2">
                    <button
                      className="navbar-toggler mt-2 ms-2"
                      type="button"
                      data-bs-toggle="offcanvas"
                      data-bs-target="#demo"
                      style={{
                        boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
                        borderRadius: "1rem",
                        
                      }}
                    >
                      <img className="navbar-toggler-icon fs-1" src="/toggle.png" />
                    </button>
                    {path != "/checkout/[id]" && (
                      <div className="mt-2 me-3">
                        <Search />
                      </div>
                    )}
                  </div>    
                  <div className="offcanvas offcanvas-start" id="demo">
                    <div className="offcanvas-header">
                      <a href="/" className="text-decoration-none" style={{color:"black"}}>
                        <strong className="offcanvas-title fs-4">Home</strong>
                      </a>
                      <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                      ></button>
                    </div>
                    <div className="offcanvas-body">
                      {user ? (
                        <div className="d-flex flex-column">
                          {user.role_id == 2 &&
                          <>
                            <Link href={"/cart"}>
                                <a style={{ color: "black" }} title={"Keranjang"} className="text-decoration-none">
                                  {path == "/cart" ? (
                                    <>
                                      <i
                                      className={`bi bi-cart3 me-0`}
                                      style={{ fontSize: "1.75rem", color:"var(--purple)" }}
                                      ></i>
                                      <span className="ms-4 me-2" style={{color:"var(--purple)"}}>Keranjang</span>
                                    </>
                                  ):(
                                    <>
                                      <i
                                      className={`bi bi-cart3 me-0`}
                                      style={{ fontSize: "1.75rem" }}
                                      ></i>
                                      <span className="ms-4 me-2">Keranjang</span>
                                    </>
                                  )}
                                  
                                  <span >
                                    <strong style={{color:"#fff", backgroundColor:"red", fontSize: "1rem", borderRadius:"1rem"}} className="px-1">{cartLength}</strong>
                                  </span>
                                  <hr></hr>
                                </a>
                            </Link>
                            <Link href={"/transaction"}>
                              <a style={{ color: "black" }} title={"Transaksi"} className="text-decoration-none">
                                {path == "/transaction" ? (
                                  <>
                                    <i
                                      className={`bi bi-clipboard2 me-4`}
                                      style={{ fontSize: "1.75rem", color: "var(--purple)" }}
                                    ></i>
                                    <span style={{color: "var(--purple)"}}>Transaksi</span>
                                  </>
                                ):(
                                  <>
                                    <i
                                      className={`bi bi-clipboard2 me-4`}
                                      style={{ fontSize: "1.75rem"}}
                                    ></i>
                                    <span>Transaksi</span>
                                  </>
                                )}
                                
                                <hr></hr>
                              </a>
                            </Link>
                            </>
                          }
                          <Link href={"/notifications"}>
                            <a style={{ color: "black" }} title={"Notifikasi"} className="text-decoration-none">
                            {path == "/notifications" ? (
                              <>
                                <i
                                  className={`bi bi-bell me-4`}
                                  style={{ fontSize: "1.75rem", color: "var(--purple)"}}
                                ></i> 
                                <span style={{color: "var(--purple)"}}>Notifikasi</span>
                                {mark_as_read.length>0 && 
                                  <span className="dot ms-2 mb-2"></span>
                                }
                              </>                           
                            ) : (
                              <>
                                <i
                                  className={`bi bi-bell me-4`}
                                  style={{ fontSize: "1.75rem" }}
                                ></i> 
                                <span>Notifikasi</span>
                                {mark_as_read.length>0 && 
                                  <span className="dot ms-2 mb-2"></span>
                                }
                              </>
                            )}
                            <hr></hr>
                            </a>
                          </Link>
                        
                          <Link href={"/info-profile"}>
                            <a style={{ color: "black" }} title={"Profil"} className="text-decoration-none">
                              <i
                                className={`bi bi-person me-4`}
                                style={{ fontSize: "1.75rem" }}
                              ></i> <span>Profile</span>
                              <hr></hr>
                            </a>
                          </Link>
                          <button onClick={(e) => handleLogout(e)}>
                            <a style={{ color: "var(--reddark)" }}>
                              <i
                                className={`bi bi-box-arrow-right me-4`}
                                style={{ fontSize: "1.75rem" }}
                              ></i>
                            </a> <span>Keluar</span>
                          </button>
                          <hr></hr>
                        </div>
                      ):(
                        <a href="/account/login" className="text-decoration-none">
                          <ButtonMasuk />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
  );
}

export default HeaderMobile;
