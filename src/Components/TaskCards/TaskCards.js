import React from "react";
import "./TaskCards.css";

const TaskCards = (props) => {
  const {
    Job_No,
    Model,
    Colour,
    Metal_Code,
    Fab_ID,
    Status,
    Message,
    Price,
    Date,
  } = props;
  return (
    <div className="TaskCardsContainer">
      <div className="TaskDetail">
        <p>
          Job No: <span>{Job_No}</span>
        </p>
        <p>
          Model: <span>{Model}</span>
        </p>
        <p>
          Colour : <span>{Colour}</span>
        </p>
        <p>
          Metal Code : <span>{Metal_Code}</span>
        </p>
        <p>
          FAB ID : <span>{Fab_ID}</span>
        </p>
        <p>
          Message : <span>{Message}</span>
        </p>
        <p>
          Price : <span>{Price}</span>
        </p>
      </div>
      <div className="TaskStatus">
        <p>{Date}</p>
        <p>{Status}</p>
      </div>
    </div>
  );
};

export default TaskCards;
