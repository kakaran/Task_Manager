import React from "react";
import "./TopBar.css";

const TopBar = () => {
  return (
    <div className="TopBarContainer">
      <p>TaskBar</p>
      <div className="TopBarUserDetail">
        <p>Name</p>
        <div className="avatarContainer">
          <img src="" alt="Avatar" />
        </div>
      </div>
    </div>
  );
};

export default TopBar;
