import axios from "axios";
import { useAtom } from "jotai";
import { TokenUpdate } from "../Jotai/Jotai";
const BASE_URL = process.env.REACT_APP_BASE_URL;

export const UserLogin = async (Email, Password) => {
  const [, setToken] = useAtom(TokenUpdate);
  try {
    const Data = (
      await axios.post(`${BASE_URL}/api/login`, { Email, Password })
    ).data;
    // console.log(Data);
    if (Data.token) {
      localStorage.setItem("auth", JSON.stringify(Data));
      setToken(Data.token);
    }
  } catch (error) {
    console.log(error);
  }
};
