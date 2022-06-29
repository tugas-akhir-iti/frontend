/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unknown-property */
import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

function Top({ children }) {
  return (
    <div>
      <header>
        <div class="p-3 text-center bg-white border-bottom">
          <div class="container">
            <div class="row">
              <div class="col-md-4 d-flex justify-content-center justify-content-md-start mb-3 mb-md-0">
                <a href="/" class="ms-md-2 d-none d-sm-block">
                  <img src="/logo.png" height="35" />
                </a>
              </div>

              <div class="col-md-4">
                <div class="d-flex w-auto my-auto mb-3 mb-md-0">
                  {children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Top;
