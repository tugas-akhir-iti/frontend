import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";

function MainLayout({ children, user }) {
  return (
    <>
      <Header user={user} />
      {children}
      <Footer />
    </>
  );
}

export default MainLayout;
