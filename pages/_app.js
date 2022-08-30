import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "jquery/dist/jquery.min.js";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min';
// import $ from 'jquery';
// import Popper from 'popper.js';
// import 'bootstrap/dist/js/bootstrap.js';
// import { useEffect } from "react";


function MyApp({ Component, pageProps }) {
//   useEffect(() => {
//     import("bootstrap/dist/js/bootstrap.js");
// }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
