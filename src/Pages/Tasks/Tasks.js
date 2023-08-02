import React, { useContext } from "react";
import "../Dashboard/Dashboard.css";
import "./Task.css";
import SideMenu from "../../Components/SideMenu/SideMenu";
import TopBar from "../../Components/TopBar/TopBar";
import { IoIosAdd } from "react-icons/io";
import TaskCards from "../../Components/TaskCards/TaskCards";
import { useNavigate } from "react-router-dom";
import { AllContext } from "../../Context/Context";

const Tasks = () => {
  const navigate = useNavigate();
  const { allTasks } = useContext(AllContext);
  return (
    <div className="AdminDashboardContainer">
      <SideMenu />
      <div className="pageContainer">
        <TopBar />
        <div className="PageData">
          <div className="TaskOptions">
            <p>All Tasks</p>
            <div onClick={() => navigate("/task_Add")}>
              <IoIosAdd style={{ fontSize: "20px" }} />
              <p>Create Task</p>
            </div>
          </div>
          <div className="TaskCardDisplay">
            {allTasks?.map((value) => {
              let StatusLength = value.Status_Allocated.length - 1;
              console.log(StatusLength);
              return (
                <TaskCards
                  Job_No={value.Job_No}
                  Model={value.Model}
                  Colour={value.Colour}
                  Metal_Code={value.Metal_Code}
                  Fab_ID={value.Fab_ID}
                  Status={value.Status_Allocated[StatusLength].Status}
                  Message={value.Message}
                  Price={value.Price}
                  Date={value.Date}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
