import React, { useContext } from "react";
import "./TopBar.css";
import { AllContext } from "../../Context/Context";
import { useNavigate } from "react-router-dom";

const TopBar = () => {
  const { info, page, setPage } = useContext(AllContext);
  const { FName, LName, image } = info ? info : "";
  const navigate = useNavigate();
  const AvtarImage =
    "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";

  return (
    <div className="TopBarContainer">
      <p>TaskBar {page}</p>
      <div
        className="TopBarUserDetail"
        onClick={() => {
          navigate("/User");
          setPage("User Info");
        }}
      >
        <p>{FName && LName ? FName + " " + LName : null}</p>
        <div className="avatarContainer">
          <img src={image ? image : AvtarImage}  alt="Avatar" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
