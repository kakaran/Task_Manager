import React, { useContext } from "react";
import "./TopBar.css";
import { AllContext } from "../../Context/Context";

const TopBar = () => {
  const { info, page } = useContext(AllContext);
  const { FName, LName } = info;
  return (
    <div className="TopBarContainer">
      <p>TaskBar {page}</p>
      <div className="TopBarUserDetail">
        <p>
          {FName} {LName}
        </p>
        <div className="avatarContainer">
          <img src="" alt="Avatar" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
