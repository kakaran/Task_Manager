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
  const { allTasks, role, homeField, setHomeField, setPage, screenSize } =
    useContext(AllContext);
  const [filterData, setFilterData] = useState(allTasks);
  const [jobFilter, setJobFilter] = useState(null);
  const [permission, setPermission] = useState(false);
  const selectDate = useRef();
  // console.log(permission);

  useEffect(() => {
    if (screenSize.width > 900) {
      setPermission(false);
    }
  }, [screenSize]);

  useEffect(() => {
    setFilterData(allTasks);
    setPage("Task");
    if (homeField) {
      const FilterData = allTasks.filter((item) => {
        return (
          item.Status_Allocated_Message[
            item.Status_Allocated_Message.length - 1
          ].Status === homeField
        );
      });
      setFilterData(FilterData);
    }
  }, [allTasks]);

  const DateTaskFilter = () => {
    try {
      const GetFilterData = allTasks.filter((filter) => {
        return filter.Date === selectDate.current;
      });
      if (homeField) {
        const value = GetFilterData.filter(
          (item) =>
            item.Status_Allocated_Message[
              item.Status_Allocated_Message.length - 1
            ].Status === homeField
        );
        setFilterData(value);
      } else {
        setFilterData(GetFilterData);
      }
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
              onClick={() => {
                setFilterData(allTasks);
                selectDate.current = "";
                setHomeField(null);
              }}
              className="cursor-pointer"
            >
              All Tasks
            </p>
            <div className="flex justify-between gap-3 w-auto">
              <div
                className={`flex gap-4 ${
                  screenSize.width < 900 ? "flex-col relative" : "flex-row"
                }`}
              >
                {screenSize.width < 900 ? (
                  <div
                    className="taskFilter"
                    onClick={() => {
                      setPermission(!permission);
                    }}
                  >
                    <p>Filter</p>
                  </div>
                ) : null}

                {screenSize.width < 900 ? (
                  permission ? (
                    <div className="absolute top-12 flex flex-col gap-4">
                      <div className="taskFilter mt-3">
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
                      </div>
                      <div className="taskFilter ">
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
                    </div>
                  ) : null
                ) : (
                  <>
                    <div className="taskFilter ">
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
                    </div>
                    <div className="taskFilter ">
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
                  </>
                )}
              </div>

              {role === "Admin" ? (
                <div
                  onClick={() => navigate("/task_Add")}
                  className="taskFilter"
                >
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
              })
              .reverse()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
