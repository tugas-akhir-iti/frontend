/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unknown-property */
import React from "react";
import Search from "./search";
import ButtonMasuk from "./buttonMasuk";
import Link from "next/link";


function Header() {
  return (
    <div>
      <header>
        <nav>
          <div className="container-fluid border-bottom py-3 d-none d-sm-block">
            <div className="row">
              <div className="col-2 d-flex justify-content-end  ">
                <a href="/">
                  <img src="/logo.png" height="45" />
                </a>
              </div>
              <div className="col-4">
                <Search />
              </div>
              <div className="col-4">
              </div>
              <div className="col-2 px-5">
                <Link href="account/login" >
                <a className="text-decoration-none">
                  <ButtonMasuk />
                </a>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header >
    </div >
  );
}

export default Header;
