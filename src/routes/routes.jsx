import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home";
import MainLayout from "../Layouts/MainLayout/MainLayout";
import Login from "../pages/Login/Login";
import CategoryPage from "../components/CategoryDropdown/CategoryPage";
import {
  topsData,
  denimsData,
} from "../components/CategoryDropdown/CategoryDropdown";
import SignUp from "../pages/SignUp/SignUp";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/Secret/Secret";
import Party from "../pages/Home/Party/Party";
import Cart from "../pages/Cart/Cart";
import Dashboard from "../Layouts/Dashboard/Dashboard";
import Admin from "../pages/Admin/Admin";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/tops",
        element: <CategoryPage data={topsData}></CategoryPage>,
      },
      {
        path: "/denims",
        element: <CategoryPage data={denimsData}></CategoryPage>,
      },
      {
        path: "/party",
        element: <Party></Party>,
      },
      {
        path: "/cart",
        element: <Cart></Cart>,
      },
      {
        path: "/tops/:category/:item?",
        element: <CategoryPage data={topsData}></CategoryPage>,
      },
      {
        path: "/denims/:category/:item?",
        element: <CategoryPage data={denimsData}></CategoryPage>,
      },
      {
        path: "/secret",
        element: (
          <PrivateRoute>
            <Secret></Secret>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "admin",
        element: <Admin></Admin>,
      },
    ],
  },
]);
