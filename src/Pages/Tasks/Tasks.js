import React, { useContext, useEffect, useRef, useState } from "react";
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
  const { allTasks, role } = useContext(AllContext);
  const [filterData, setFilterData] = useState(allTasks);
  const [jobFilter, setJobFilter] = useState(null);
  const selectDate = useRef();
  useEffect(() => {
    setFilterData(allTasks);
  }, [allTasks]);

  const DateTaskFilter = () => {
    try {
      const GetFilterData = allTasks.filter(
        (filter) => filter.Date === selectDate.current
      );

      setFilterData(GetFilterData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="AdminDashboardContainer">
      <SideMenu />
      <div className="pageContainer">
        <TopBar />
        <div className="PageData">
          <div className="TaskOptions">
            <p
              onClick={() => {setFilterData(allTasks);selectDate.current = ""}}
              className="cursor-pointer"
            >
              All Tasks
            </p>
            <div className="flex  justify-between gap-5 w-auto">
              <input
                type="date"
                name="Date"
                id=""
                value={selectDate.current}
                onChange={(e) => {
                  selectDate.current = e.target.value;
                  DateTaskFilter();
                }}
                style={{
                  outline: "none",
                  backgroundColor: "#eee9fd",
                  borderRadius: "10px",
                  padding: "10px",
                  color: "#6f47eb",
                }}
              />
              <div>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="Search Job No"
                  className="outline-none bg-[#eee9fd]"
                  onChange={(e) => {
                    setJobFilter(e.target.value);
                  }}
                  value={jobFilter}
                />
              </div>

              {role === "Admin" ? (
                <div onClick={() => navigate("/task_Add")}>
                  <IoIosAdd style={{ fontSize: "20px" }} />
                  <p>Create Task</p>
                </div>
              ) : null}
            </div>
          </div>
          <div className="TaskCardDisplay">
            {filterData
              ?.filter((item) => {
                return jobFilter === null
                  ? item
                  : item.Job_No.toString().includes(jobFilter);
              })
              .map((value, index) => {
                let StatusLength = value.Status_Allocated_Message.length - 1;
                return (
                  <div
                    onClick={() => {
                      navigate(`/task_Update/${value._id}`);
                    }}
                    style={{ cursor: "pointer" }}
                    key={index}
                  >
                    <TaskCards
                      Job_No={value.Job_No}
                      Model={value.Model}
                      Colour={value.Colour}
                      Metal_Code={value.Metal_Code}
                      Fab_ID={value.Fab_ID}
                      Status={
                        value.Status_Allocated_Message[StatusLength]?.Status
                      }
                      Message={
                        value.Status_Allocated_Message[StatusLength]?.Message
                      }
                      Price={value.Price}
                      Date={value.Date}
                    />
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
