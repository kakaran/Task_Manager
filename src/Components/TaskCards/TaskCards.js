import React, { useContext } from "react";
import "./TaskCards.css";
import { AllContext } from "../../Context/Context";

const TaskCards = (props) => {
  const { role } = useContext(AllContext);
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
  // const convertDate = Date.substring(0, 10);

  const SmallContent = Message?.slice(0, 20);
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
          Message : <span>{SmallContent}</span>
        </p>
        {role === "Engineer" ? null : (
          <p>
            Price : <span>{Price}</span>
          </p>
        )}
      </div>
      <div className="TaskStatus">
        <p>{Date}</p>
        <p>{Status}</p>
      </div>
    </div>
  );
};

export default TaskCards;
