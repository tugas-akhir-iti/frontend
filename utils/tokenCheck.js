import axios from "axios";
import { useRouter } from "next/router";
import cookies from "next-cookies";

export async function CheckUserToken(context) {
  const router = useRouter();
  const API = process.env.NEXT_PUBLIC_API_ENDPOINT;

  let user = null;

  // GET COOKIES
  let token = cookies(context).token;

  try {
    if (!token) {
      // // REFRESH ACCESS TOKEN
      // const res = await axios.put(API + "authentications", {
      //   refreshToken,
      // });
      // token = res.data.token;

      // // SET COOKIE ACCESS TOKEN
      // context.res?.setHeader(
      //   "Set-Cookie",
      //   "token=" + token + "; path=/; max-age=1800"
      // );
      router.replace("/account/login");
    }

    if (token) {
      // // GET USER INFO
      // const res_user = await axios.get(API + "users", {
      //   headers: { Authorization: "Bearer " + token },
      // });
      // user = res_user.data.data.user;
    }
  } catch (error) {
    console.log(error.response);
  }
  return { user, token };
}
