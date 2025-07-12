import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex">
      <div className="w-72 min-h-screen bg-[#c096c0]">
        <ul className="menu p-4">
          <li>
            <NavLink to="/dashboard/cart">Cart</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">Cart</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">Cart</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">Cart</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">Cart</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">Cart</NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/cart">Cart</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
