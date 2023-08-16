import React, { useContext, useEffect, useState } from "react";
import "../../Dashboard/Dashboard.css";
import "./ModelAdd.css";
import TopBar from "../../../Components/TopBar/TopBar";
import SideMenu from "../../../Components/SideMenu/SideMenu";
import axios from "axios";
import { AllContext } from "../../../Context/Context";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const ModelAdd = () => {
  const { setRender, NotificationMethod, render, setPage } =
    useContext(AllContext);
  const [coloursvalue, setColoursValue] = useState([
    {
      value: "",
      index: 1,
    },
  ]);
  const [mobileCode, setMobileCode] = useState();

  const ColourValueAdd = (value1, index1) => {
    // console.log(value1, index1);
    setColoursValue((coloursvalue) => {
      const updatedColoursValue = coloursvalue.map((value) =>
        value.index === index1 ? { ...value, value: value1 } : value
      );
      return updatedColoursValue;
    });
  };

  const ColoursValueIncrement = () => {
    const colourlastValue = coloursvalue.length;
    // console.log(colourlastValue);
    if (!colourlastValue) {
      setColoursValue((colourLength) => [
        ...colourLength,
        { value: "", index: 1 },
      ]);
    } else {
      setColoursValue((colourLength) => [
        ...colourLength,
        { value: "", index: colourLength[colourlastValue - 1].index + 1 },
      ]);
    }
  };

  const ColourValueDecrement = (value) => {
    setColoursValue((current) => {
      return current.filter((counting) => {
        return counting.index !== value;
      });
    });
  };

  const ColourAddApicall = async () => {
    try {
      const Colour = [];
      coloursvalue?.map((value) => Colour.push(value.value));
      const Name = mobileCode;
      const Response = await axios.post(`${BASE_URL}/api/ModelAdd`, {
        Name,
        Colour,
      });
      if (Response) {
        setRender(!render);
        NotificationMethod(Response.message, Response.status);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setPage("Mobile");
  }, []);

  return (
    <div className="AdminDashboardContainer">
      <SideMenu />
      <div className="pageContainer">
        <TopBar />
        <div className="PageData">
          <div className="MobileAddContainer">
            <div className="MobileName">
              <div>
                <label htmlFor="">Mobile : </label>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Model Code"
                  onChange={(e) => setMobileCode(e.target.value)}
                />
              </div>
              <button className="button-23" onClick={ColourAddApicall}>
                + Submit
              </button>
            </div>
            <div className="ColourNames">
              <p style={{ fontWeight: "500", fontSize: "18px" }}>Colours</p>
              {coloursvalue?.map((value, index) => {
                return (
                  <div key={index}>
                    <label htmlFor="">Colour</label>
                    <span>
                      <input
                        type="text"
                        name=""
                        id=""
                        placeholder="Colour"
                        value={value.value}
                        onChange={(e) =>
                          ColourValueAdd(e.target.value, value.index)
                        }
                      />
                      <button
                        style={{
                          marginLeft: "5px",
                          backgroundColor: "#fcdad7",
                          color: "#f3685f",
                          // padding: "8px",
                          width: "50px",
                          height: "50px",
                          borderRadius: "10px",
                          fontSize: "20px",
                        }}
                        onClick={() => ColourValueDecrement(value.index)}
                      >
                        x
                      </button>
                    </span>
                  </div>
                );
              })}
              <button className="button-23" onClick={ColoursValueIncrement}>
                + Add Colour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelAdd;
