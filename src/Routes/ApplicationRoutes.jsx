import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";
import DashboardLayout from "../components/Layout/DashboardLayout";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import Employees from "../Pages/Employees";
import Assets from "../Pages/Assets";
import PrivateRoutes from "./PrivateRoutes";
import { Requests } from "../Pages/Requests";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Login />} />
      <Route
        path="/"
        element={
          <>
            <PrivateRoutes />
            <DashboardLayout />
          </>
        }
      >
        <Route path="/dashboard" exact element={<Dashboard />} />
        <Route path="/employees" element={<Employees />} />
        <Route path="/assets" element={<Assets />} />
        <Route path="/requests" element={<Requests />} />
      </Route>
    </Route>
  )
);

const ApplicationRoutes = () => {
  return <RouterProvider router={router} />;
};

export default ApplicationRoutes;
