import React from "react";
// import Footer from "../components/footer";
import HeaderMobile from "../components/headerMobile";

function MobileLayout({ children, user, notifications, cartLength }) {
  return (
    <>
      <HeaderMobile user={user} notifications={notifications} cartLength={cartLength}/>
      {children}
      {/* <Footer /> */}
    </>
  );
}

export default MobileLayout;
