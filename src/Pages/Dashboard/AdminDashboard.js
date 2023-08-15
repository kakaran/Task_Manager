import React, { useContext, useEffect } from "react";
import SideMenu from "../../Components/SideMenu/SideMenu";
import "./Dashboard.css";
import TopBar from "../../Components/TopBar/TopBar";
import { AllContext } from "../../Context/Context";
import { MdHomeRepairService, MdEngineering } from "react-icons/md";
import { AiFillShop } from "react-icons/ai";
import { FaCrown } from "react-icons/fa6";
import { BsFileEarmarkPost } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const { allTask, setHomeField, setPage } = useContext(AllContext);
  const navigate = useNavigate();

  useEffect(() => {
    setPage("Home");
  }, []);

  return (
    <div className="AdminDashboardContainer">
      <SideMenu />
      <div className="pageContainer">
        <TopBar />
        <div className="PageData">
          <div className="flex gap-4 justify-center flex-wrap smallSize">
            <div
              className="border w-44 h-44 flex justify-center flex-col items-center gap-2 rounded-md shadow-lg cursor-pointer"
              onClick={() => {
                setHomeField("Service Center");
                navigate("/tasks");
              }}
            >
              <div className="rounded-full bg-[#eee9fd] p-4">
                <MdHomeRepairService className="text-2xl text-[#6f47eb]" />
              </div>
              <p className="font-bold text-xl">Service Center</p>
              <p className="text-[#6f47eb] font-bold text-lg">
                {allTask?.ServiceCenter}
              </p>
            </div>
            <div
              className="border w-44 h-44 flex justify-center flex-col items-center gap-2 rounded-md shadow-lg cursor-pointer"
              onClick={() => {
                setHomeField("Vender");
                navigate("/tasks");
              }}
            >
              <div className="rounded-full bg-[#eee9fd] p-4">
                <AiFillShop className="text-2xl text-[#6f47eb]" />
              </div>
              <p className="font-bold text-xl">Vender</p>
              <p className="text-[#6f47eb] font-bold text-lg">
                {allTask?.Vender}
              </p>
            </div>
            <div
              className="border w-44 h-44 flex justify-center flex-col items-center gap-2 rounded-md shadow-lg cursor-pointer"
              onClick={() => {
                setHomeField("Owner");
                navigate("/tasks");
              }}
            >
              <div className="rounded-full bg-[#eee9fd] p-4">
                <FaCrown className="text-2xl text-[#6f47eb]" />
              </div>
              <p className="font-bold text-xl">Owner</p>
              <p className="text-[#6f47eb] font-bold text-lg">
                {allTask?.Owner}
              </p>
            </div>
            <div
              className="border w-44 h-44 flex justify-center flex-col items-center gap-2 rounded-md shadow-lg cursor-pointer"
              onClick={() => {
                setHomeField("Engineer");
                navigate("/tasks");
              }}
            >
              <div className="rounded-full bg-[#eee9fd] p-4">
                <MdEngineering className="text-2xl text-[#6f47eb]" />
              </div>
              <p className="font-bold text-xl">Engineer</p>
              <p className="text-[#6f47eb] font-bold text-lg">
                {allTask?.Engineer}
              </p>
            </div>
            <div
              className="border w-44 h-44 flex justify-center flex-col items-center gap-2 rounded-md shadow-lg cursor-pointer"
              onClick={() => {
                setHomeField("RMA");
                navigate("/tasks");
              }}
            >
              <div className="rounded-full bg-[#eee9fd] p-4">
                <BsFileEarmarkPost className="text-2xl text-[#6f47eb]" />
              </div>
              <p className="font-bold text-xl">RMA</p>
              <p className="text-[#6f47eb] font-bold text-lg">{allTask?.RMA}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
