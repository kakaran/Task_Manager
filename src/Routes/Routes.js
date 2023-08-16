import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import Engineer from "../Pages/Engineers/Engineer";
import EngineerAdd from "../Pages/Engineers/EngineerAdd/EngineerAdd";
import Login from "../Pages/Login/Login";
import Model from "../Pages/Model/Model";
import ModelAdd from "../Pages/Model/ModelAdd/ModelAdd";
import TaskAdd from "../Pages/Tasks/TaskAdd/TaskAdd";
import TaskUpdate from "../Pages/Tasks/TaskUpdate/TaskUpdate";
import Tasks from "../Pages/Tasks/Tasks";
import UserInfo from "../Pages/UserInfo/UserInfo";

const CommonRoutes = [{ path: "/", element: <Login /> }];

const AdminRoutes = [
  { path: "/home", element: <AdminDashboard /> },
  { path: "/tasks", element: <Tasks /> },
  { path: "/task_Add", element: <TaskAdd /> },
  { path: "/task_Update/:id", element: <TaskUpdate /> },
  { path: "/mobiles", element: <Model /> },
  { path: "/mobiles_Add", element: <ModelAdd /> },
  { path: "/engineers", element: <Engineer /> },
  { path: "/engineers_Add", element: <EngineerAdd /> },
  { path: "/User", element: <UserInfo /> },
];

const EngineerRoutes = [
  { path: "/home", element: <AdminDashboard /> },
  { path: "/tasks", element: <Tasks /> },
  { path: "/User", element: <UserInfo /> },
  { path: "/task_Update/:id", element: <TaskUpdate /> },
];

const routes = (role, isSignedIn) => {
  const SignedInList = role === "Admin" ? AdminRoutes : EngineerRoutes;
  return isSignedIn ? [...SignedInList, ...CommonRoutes] : [...CommonRoutes];
};

export default routes;
