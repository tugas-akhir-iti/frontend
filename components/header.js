/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unknown-property */
import React from "react";
import Search from "./search";
import { useRouter } from "next/router";
import ButtonMasuk from "./buttonMasuk";
import Link from "next/link";
import cookie from "js-cookie";

function Header({ user }) {
  const router = useRouter();
  const handleLogout = async (e) => {
    console.log("Logging out...");
    e.preventDefault();
    try {
      cookie.remove("token");
    } catch (error) {
      console.log(error);
    }
    alert("Wait until you are logged out.");
    router.replace("/");
  };
  return (
    <div
      className=" container-fluid p-0 sticky-top"
      style={{
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
        backgroundColor: "white",
      }}
    >
      <div className="max-width d-flex justify-content-between p-2">
        <div className="d-flex gap-3">
          <div>
            <Link href="/">
              <a>
                <img src="/logo.png" height="45" />
              </a>
            </Link>
          </div>
          <div>
            <Search />
          </div>
        </div>
        <div>
          {user ? (
            <ul className="m-0 p-0 d-flex gap-3 position-relative">
              {[
                // ["/history-buyer", "list-ul"],
                ["#", "bell"],
                ["/info-profile", "person"],
              ].map(([href, icon], index) => (
                <li key={index}>
                  <Link href={href}>
                    <a style={{ color: "black" }}>
                      <i
                        className={`bi bi-${icon}`}
                        style={{ fontSize: "1.75rem" }}
                      ></i>
                    </a>
                  </Link>
                </li>
              ))}
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
        </div>
      </div>
    </div>
  );
}

export default Header;
