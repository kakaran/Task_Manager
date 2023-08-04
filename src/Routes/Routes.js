import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import Login from "../Pages/Login/Login";
import Model from "../Pages/Model/Model";
import ModelAdd from "../Pages/Model/ModelAdd/ModelAdd";
import TaskAdd from "../Pages/Tasks/TaskAdd/TaskAdd";
import TaskUpdate from "../Pages/Tasks/TaskUpdate/TaskUpdate";
import Tasks from "../Pages/Tasks/Tasks";

const CommonRoutes = [{ path: "/", element: <Login /> }];

const AdminRoutes = [
  { path: "/home", element: <AdminDashboard /> },
  { path: "/tasks", element: <Tasks /> },
  { path: "/task_Add", element: <TaskAdd /> },
  { path: "/task_Update/:id", element: <TaskUpdate /> },
  { path: "/Mobiles", element: <Model /> },
  { path: "/Mobiles_Add", element: <ModelAdd /> },
];

const EngineerRoutes = [];

const routes = (role, isSignedIn) => {
  console.log(role, isSignedIn);
  const SignedInList = role === "Admin" ? AdminRoutes : EngineerRoutes;
  return isSignedIn ? [...SignedInList, ...CommonRoutes] : [...CommonRoutes];
};

export default routes;
