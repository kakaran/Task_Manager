import AdminDashboard from "../Pages/Dashboard/AdminDashboard";
import Login from "../Pages/Login/Login";

const CommonRoutes = [{ path: "/", element: <Login /> }];

const AdminRoutes = [{ path: "/dashboard", element: <AdminDashboard /> }];

const EngineerRoutes = [];

const routes = (role, isSignedIn) => {
  console.log(role,isSignedIn);
  const SignedInList = role === "Admin" ? AdminRoutes : EngineerRoutes;
  return isSignedIn ? [...SignedInList, ...CommonRoutes] : [...CommonRoutes];
};

export default routes;
