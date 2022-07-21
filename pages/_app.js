import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "jquery/dist/jquery.min.js";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }) {
//   const [userInfo, setUserInfo] = useState({});
//   useEffect(() => {
//     if(user.avatar) {
//         setUserInfo(user);
//     }
// });

  return <Component {...pageProps} />;
}

export default MyApp;
