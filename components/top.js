/* eslint-disable @next/next/no-html-link-for-pages */
/* eslint-disable react/no-unknown-property */
import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

function Top({ children }) {
  return (
    // <div>
    //   <header>
    //     <div className="p-3 text-center bg-white border-bottom">
    //       <div className="container">
    //         <div className="row d-flex flex-row gap-2">
    //           <div className="col-md-4 d-flex mb-3 mb-md-0">
    //             <a href="/" className="ms-md-2 d-none d-sm-block">
    //               <img src="/logo.png" height="35" />
    //             </a>
    //           </div>

    //           <div className="col-md-4">
    //             <div className="d-flex w-auto my-auto mb-3 mb-md-0 justify-content-center">
    //               {children}
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </header>
    // </div>
    <div
    className=" container-fluid p-0 sticky-top "
    style={{
      boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.15)",
      backgroundColor: "white",
    }}
  > 
    
    <div className="max-width d-flex justify-content-between p-2 position-relative">
      <div className="d-flex gap-3">
        <div className="">
          <Link href="/">
            <a>
              <img src="/logo.png" height="45" />
            </a>
          </Link>
        </div>
        <div className="">
          {children}
        </div> 
      </div>
     </div>
  </div>
  );
}

export default Top;
