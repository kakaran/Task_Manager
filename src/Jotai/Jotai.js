import { atom } from "jotai";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const isSignedIn = atom(false);
export const userDeatil = atom({
  Email: "",
  Password: "",
});

const Token = atom();

export const TokenUpdate = atom(null, (get, set, _arg) => {
  set(Token, _arg);
});

export const UserInfoUpdate = atom(null, (get, set, Email, Password) => {
  // User Email And Password Update Function
  const Detail = get(userDeatil);
  set(userDeatil, { ...Detail, Email: Email, Password: Password });
});

// console.log(Token,isSignedIn ,"hi2");

export const AuthCheck = atom(null, (get, set, _arg) => {});

export const loginUser = atom(null, async (get, set, _arg) => {
  // The Function is Login API Call and set the token in localStorage.
  try {
    const { Email, Password } = get(userDeatil);
    const Data = (
      await axios.post(`${BASE_URL}/api/login`, { Email, Password })
    ).data;
    // console.log(Data);
    if (Data.token) {
      localStorage.setItem("auth", JSON.stringify(Data));
      set(isSignedIn, true);
      set(Token, Data.token);
    }
    console.log(isSignedIn);
  } catch (error) {
    console.log(error);
  }
});

// console.log(isSignedIn);
