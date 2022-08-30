/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unknown-property */
import React, {useState} from "react";
import Search from "./search";
import { useRouter } from "next/router";
import ButtonMasuk from "./buttonMasuk";
import Link from "next/link";
import cookie from "js-cookie";
import moment from "moment";
import axios from "axios";
const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

function Header({ user, notifications, cartLength}) {
  // console.log(cartLength);
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
  
  const [notifPopup, setNotifPopup] = useState(false);
  const handleNotifPopup = () => {
    setNotifPopup((notifPopup = !notifPopup));
  };

  // const handleUpdateNotif = async (e) => {
  //   e.preventDefault();
  //   console.log(e.target.data("myValue"));
  //   try{
  //     await axios.put(API+"/notifications/"+e.target.value)
  //   }catch(error){
  //     console.log(error);
  //   }
  // }

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
    <div
      className=" container-fluid p-0 sticky-top "
      style={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        backgroundColor: "white",
      }}
    > 
      
      <div className="max-width d-flex justify-content-between p-2 position-relative">
        <div className="d-flex gap-3">
          <div>
            <Link href="/">
              <a>
                <img src="/logo.png" height="45" />
              </a>
            </Link>
          </div>
          <div>
            { user == null || user.role_id == 2 && path != "/checkout/[id]"? (
              <Search />
            ):(null)
            }
          </div>
        </div>

        {path != "/checkout/[id]" &&

        <div>
          {user ? (
            <ul className="m-0 p-0 d-flex gap-3 position-relative">
              {user.role_id == 2 &&
              <> 
              <li>
                <Link href={"/cart"}>
                  <a style={{ color: "black"}} title={"Keranjang"} className="text-decoration-none">
                    {path == "/cart" ? (
                      <span
                      className={`bi bi-cart3`}
                      style={{ fontSize: "1.75rem", color: "var(--purple)" }}
                      ></span>
                    ):(
                      <span
                        className={`bi bi-cart3`}
                        style={{ fontSize: "1.75rem", color: "black" }}
                      ></span>
                    )}
                    
                    <span>
                      <strong style={{color:"#fff", backgroundColor:"red", fontSize: "1rem", borderRadius:"1rem"}} className="px-1">{cartLength}</strong>
                    </span>
                  </a>
                </Link>
              </li>
              <li>
              <Link href={"/transaction"}>
                <a style={{ color: "black" }} title={"Transaksi"}>
                  {path == "/transaction" ? (
                    <i
                      className={`bi bi-clipboard2`}
                      style={{ fontSize: "1.75rem", color:"var(--purple)" }}
                    ></i>
                  ):(
                    <i
                      className={`bi bi-clipboard2`}
                      style={{ fontSize: "1.75rem", color:"black" }}
                    ></i>
                  )}
                </a>
              </Link>
            </li>
            </>
            }
              <li>
                <Link href={""}>
                  <a style={{ color: "black",}} title={"Notifications"} onClick={handleNotifPopup}>
                    <span
                      className={`bi bi-bell`}
                      style={{ fontSize: "1.75rem" }}
                    ></span>
                    {mark_as_read.length>0 && 
                      <span className="dot mb-3">
                      </span>
                    }
                  </a>
                </Link>
              </li>
              <li>
                <Link href={"/info-profile"}>
                  <a style={{ color: "black" }} title={"Profil"}>
                    <i
                      className={`bi bi-person`}
                      style={{ fontSize: "1.75rem" }}
                    ></i>
                  </a>
                </Link>
              </li>
              <li>
                <button onClick={(e) => handleLogout(e)}>
                  <a style={{ color: "var(--reddark)" }}>
                    <i
                      className={`bi bi-box-arrow-right`}
                      style={{ fontSize: "1.75rem" }}
                    ></i>
                  </a>
                </button>
              </li>
            </ul>
          ) : (
            <Link href="/account/login">
              <a className="text-decoration-none">
                <ButtonMasuk />
              </a>
            </Link>
          )}
          
          {notifPopup && (
            <div
              className="position-absolute p-3"
              style={{
                top: "55px",
                transform: "translate(-60%,0%)",
                boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
                borderRadius: "1rem",
                backgroundColor: "white"
              }}
              zIndex={15000}
            >
              <div
                className="d-flex flex-column gap-1"
                style={{
                  maxHeight: "300px",
                  width: "400px",
                  overflow: "auto",
                }}
              >
               {Object.keys(notifications).length > 0 ? (
                  <>
                    {notifications.map((notification, index) => (
                      <>

                      {notification.mark_as_read == false ? (
                      <div className="d-flex  gap-2 me-2 p-2" key={index} style={{backgroundColor:"#f1d7fc"}} >
                        <Link href={"#"}>
                        <a  className="text-decoration-none" style={{color: "black"}}>
                        <div style={{width:"100%"}}>
                          <div className="d-flex" style={{ fontSize: "0.8rem", color: "black", fontWeight: "700" }}>
                            <i class="bi bi-cart-check"></i>
                            <div className="ms-2">Order Produk</div>
                            <p className="ms-auto">
                              {moment(notification.createdAt).format(
                                "DD MMM, hh.mm"
                              )}
                            </p>
                          </div>
                          <div>
                            <h6 className="m-0">{notification.notification_title}</h6>
                            <p className="m-0 mt-1">{notification.notification_desc}</p>
                            <hr className="m-0 mt-3"/>
                          </div>
                        </div>
                        </a>
                        </Link>
                      </div>
                      ):(
                      <div className="d-flex  gap-2 me-2 p-2" key={index}>
                        <Link href={`${notification.notification_link}`}>
                        <a  className="text-decoration-none" style={{color: "black"}}>
                        <div style={{width:"100%"}}>
                          <div className="d-flex" style={{ fontSize: "0.8rem", color: "black", fontWeight: "700" }}>
                            <i class="bi bi-cart-check"></i>
                            <div className="ms-2">Order Produk</div>
                            <p className="ms-auto">
                              {moment(notification.createdAt).format(
                                "DD MMM, hh.mm"
                              )}
                            </p>
                          </div>
                          <div>
                            <h6 className="m-0">{notification.notification_title}</h6>
                            <p className="m-0 mt-1">{notification.notification_desc}</p>
                            <hr className="m-0 mt-3"/>
                          </div>
                        </div>
                        </a>
                        </Link>
                      </div>
                      )}

                      </>
                    ))}
                  </>
                ) : (
                  <div className="mx-auto">All Cleared 👌</div>
                )}
              </div>
            </div>
          )}
        </div> 
        }
      </div>
    </div>
  );
}

export default Header;
