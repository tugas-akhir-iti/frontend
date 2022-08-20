import React from "react";
// import Footer from "../components/footer";
import HeaderMobile from "../components/headerMobile";

function MobileLayout({ children, user, notifications }) {
  return (
    <>
      <HeaderMobile user={user} notifications={notifications}/>
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default MobileLayout;
