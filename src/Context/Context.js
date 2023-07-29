import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";

const AllContext = createContext();
const BASE_URL = process.env.REACT_APP_BASE_URL;

const AllProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: "",
  });
  const [role, setRole] = useState();

  const setToken = async () => {
    const Data = JSON.parse(localStorage.getItem(auth));
    console.log(Data);
    if (Data) {
      setAuth({
        token: Data.token,
      });
    }
  };
  if (auth.token) {
    axios.defaults.headers.common["authtok"] = auth.token;
  }

  const Authentication = async () => {
    try {
      const Response = (await axios.get(`${BASE_URL}/api/authentication`)).data;
      console.log(Response);
      if (Response) {
        setRole();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    Authentication();
    setToken();
  }, [auth]);

  return (
    <AllContext.Provider value={[auth, setAuth, Authentication]}>
      {children}
    </AllContext.Provider>
  );
};

const UseController = () => useContext(AllContext);

export { UseController, AllProvider };
