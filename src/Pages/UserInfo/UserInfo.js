import React, { useContext, useState } from "react";
import "../Dashboard/Dashboard.css";
import TopBar from "../../Components/TopBar/TopBar";
import SideMenu from "../../Components/SideMenu/SideMenu";
import "./UserInfo.css";
import { AllContext } from "../../Context/Context";
import { useFormik } from "formik";
import { UserInfoSchema } from "../../Schemas/Schemas";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import {logo} from "../../Assets/"

const UserInfo = () => {
  const { info, NotificationMethod, render, setRender } =
    useContext(AllContext);
  const [inputs, setInputs] = useState(true);
  const [imageInput, setImageInput] = useState(false);
  const [image, setImage] = useState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const AvtarImage =
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
  const navigate = useNavigate();
  const initialValues = {
    FName: info?.FName,
    LName: info?.LName,
    PhoneNo: info?.PhoneNo,
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      validationSchema: UserInfoSchema,
      onSubmit: async (values) => {
        console.log("hello");
        const { FName, LName, PhoneNo } = values;

        await axios
          .post(`${BASE_URL}/api/InfoUpdate`, {
            FName,
            LName,
            PhoneNo,
          })
          .then((Response) => {
            console.log(Response);
            if (Response) {
              NotificationMethod(Response.data.message, Response.data.status);
              setInputs(true);
              setRender(!render);
            }
          })
          .catch((error) => console.log(error));
      },
    });

  const ImageUploder = async () => {
    try {
      let formData = new FormData();
      formData.append("image", image, image.name);
      const Response = (
        await axios.post(`${BASE_URL}/api/ImageUpload`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
      ).data;

      if (Response) {
        NotificationMethod(Response.message, Response.status);
        setImageInput(false);
        setRender(!render);
      }
      console.log(Response);
    } catch (error) {
      console.log(error);
    }
  };

  const LogoutMethod = () => {
    try {
      localStorage.removeItem("auth");
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="UserInfoContainer">
      <div className="AdminDashboardContainer">
        <SideMenu />
        <div className="pageContainer">
          <TopBar />
          <div className="PageData">
            <div className="UserInfoConatiner">
              <span className="flex justify-between items-center m-2">
                <p>My Profile</p>
                <button className="button-28" onClick={LogoutMethod}>Logout</button>
              </span>
              <div className="UserImageName">
                <div>
                  {!imageInput ? (
                    <img src={info?.image ? info?.image : AvtarImage} alt="" />
                  ) : (
                    <div className="ImageUplaodContainer">
                      <label htmlFor="image">
                        <span>+</span> Upload
                      </label>
                      <input
                        type="file"
                        name=""
                        id="image"
                        onChange={(e) => {
                          setImage(e.target.files[0]);
                        }}
                      />
                    </div>
                  )}

                  <div>
                    <p>{info?.FName + " " + info?.LName}</p>
                    <p style={{ color: "#586782", fontSize: "14px" }}>
                      {info?.Role}
                    </p>
                  </div>
                </div>
                <div className="flex gap-10 items-center">
                  {!imageInput ? null : (
                    <button
                      type="submit"
                      className="button-23"
                      onClick={ImageUploder}
                    >
                      Submit
                    </button>
                  )}
                  <div
                    className={`p-2 w-24 h-11 rounded-3xl border text-center cursor-pointer ${
                      !imageInput
                        ? " border-[#eaf2f8] text-[#8993a6]"
                        : "border-black text-black"
                    }`}
                    onClick={() => setImageInput(!imageInput)}
                  >
                    {!imageInput ? "Edit" : "Cancel"}
                  </div>
                </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="Personal-Information">
                  <div className="flex justify-between">
                    <p>Personal Information </p>
                    <div className="flex gap-10 items-center">
                      {inputs ? null : (
                        <button type="submit" className="button-23">
                          Submit
                        </button>
                      )}
                      <div
                        className={`p-2 w-24 h-11 rounded-3xl border text-center cursor-pointer ${
                          inputs
                            ? " border-[#eaf2f8] text-[#8993a6]"
                            : "border-black text-black"
                        }`}
                        onClick={() => setInputs(!inputs)}
                      >
                        {inputs ? "Edit" : "Cancel"}
                      </div>
                    </div>
                  </div>
                  <div className="FirstTab">
                    <div>
                      <label
                        htmlFor="FName"
                        style={{ fontSize: "15px", color: "#8f9aab" }}
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="FName"
                        id="FName"
                        disabled={inputs}
                        value={values?.FName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.FName && touched.FName ? (
                        <p className="text-red-800">{errors.FName}</p>
                      ) : null}
                    </div>
                    <div>
                      <label
                        htmlFor="LName"
                        style={{ fontSize: "15px", color: "#8f9aab" }}
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="LName"
                        id="LName"
                        disabled={inputs}
                        value={values?.LName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        style={{ outline: "none" }}
                      />
                      {errors.LName && touched.LName ? (
                        <p className="text-red-800">{errors.LName}</p>
                      ) : null}
                    </div>
                  </div>
                  <div className="FirstTab">
                    <div>
                      <label
                        htmlFor="FName"
                        style={{ fontSize: "15px", color: "#8f9aab" }}
                      >
                        Email
                      </label>
                      <input
                        type="text"
                        name="Email"
                        id="Email"
                        disabled
                        value={info?.Email}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="PhoneNo"
                        style={{ fontSize: "15px", color: "#8f9aab" }}
                      >
                        Phone
                      </label>
                      <input
                        type="text"
                        name="PhoneNo"
                        id="PhoneNo"
                        disabled={inputs}
                        value={values?.PhoneNo}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {errors.PhoneNo && touched.PhoneNo ? (
                        <p className="text-red-800">{errors.PhoneNo}</p>
                      ) : null}
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
