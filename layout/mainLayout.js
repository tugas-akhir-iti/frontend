import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";

function MainLayout({ children, user, notifications, cartLength }) {
  return (
    <>
      <Header user={user} notifications={notifications} cartLength={cartLength}/>
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
