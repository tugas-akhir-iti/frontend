/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unknown-property */
import React from "react";
import Search from "./search";
import { useRouter } from "next/router";
import ButtonMasuk from "./buttonMasuk";
import Link from "next/link";
import cookie from "js-cookie";
const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

function Header({ user, notifications, cartLength}) {
  // console.log(cartLength);
  const router = useRouter();
  const path = router.pathname;

  // const [notifPopup, setNotifPopup] = useState(false);
  // const handleNotifPopup = () => {
  //   setNotifPopup((notifPopup = !notifPopup));
  // };  

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
                  <a style={{ color: "black" }} title={"Keranjang"}>
                    <i
                      className={`bi bi-bell`}
                      style={{ fontSize: "1.75rem" }}
                      ></i>
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
          
          {/* {notifPopup && (
            <div
              className="position-absolute p-3"
              style={{
                top: "55px",
                transform: "translate(-80%,0%)",
                boxShadow: "0px 0px 6px rgba(0,0,0,0.15)",
                borderRadius: "1rem",
                backgroundColor: "white",
              }}
            >
              <div
                className="d-flex flex-column gap-2"
                style={{
                  maxHeight: "200px",
                  width: "300px",
                  overflow: "auto",
                }}
              >
               {Object.keys(notifications).length > 0 ? (
                  <>
                    {notifications.map((notification, index) => (
                      <div className="d-flex gap-2" key={index}>
                        <img
                          src={notification.Product.product_image}
                          style={{
                            height: "100%",
                            width: "50px",
                            borderRadius: "12px",
                          }}
                        ></img>
                        <div style={{width:"100%"}}>
                          <div className="d-flex justify-content-between" style={{ fontSize: "0.75rem", color: "gray" }}>
                            {notification.Order.order_status == 0 ? (
                              <div>Penawaran Produk</div>
                            ) : (
                              <div>Berhasil Diterbitkan</div>
                            )}
                            <p className="m-0">
                              {moment(notification.createdAt).format(
                                "DD MMM, hh.mm"
                              )}
                            </p>
                          </div>
                          <h5>{notification.Product.product_name}</h5>
                          <p className="m-0">
                            Rp.{" "}
                            {notification.Product.product_price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          </p>
                          <p className="m-0">
                            Ditawar Rp.{" "}
                            {notification.Order.order_price
                              .toString()
                              .replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </>
                ) : (
                  <div className="mx-auto">All Cleared 👌</div>
                )}
              </div>
            </div>
          )}*/}
        </div> 
        }
      </div>
    </div>
  );
}

export default Header;
