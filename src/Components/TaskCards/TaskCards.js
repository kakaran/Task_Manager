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
  const SmallContent = Message?.slice(0, 15);
  const MetalCode = Metal_Code?.slice(0,9)
  const FabId = Fab_ID?.slice(0,9)
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
          Metal Code : <span>{MetalCode}</span>
        </p>
        <p>
          FAB ID : <span>{Fab_ID}</span>
        </p>
        {role === "Engineer" ? null : (
          <>
            <p>
              Message : <span>{SmallContent}</span>
            </p>
            <p>
              Price :
              <span>
                <sup>₹</sup>
                {Price}
              </span>
            </p>
          </>
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
