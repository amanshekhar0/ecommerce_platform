import React from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen bg-gray-50 border-r border-gray-200 shadow-lg">
      <div className="flex flex-col gap-6 pt-8 pl-[20%] text-[15px]">
        <NavLink
          className="flex items-center gap-3 border border-gray-300 px-4 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-200 hover:scale-105 transition-transform mr-4"
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="Add Icon" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 border border-gray-300 px-4 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-200 hover:scale-105 transition-transform mr-4"
          to="/list"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="List Icon" />
          <p className="hidden md:block">List Items</p>
        </NavLink>

        <NavLink
          className="flex items-center gap-3 border border-gray-300 px-4 py-3 rounded-xl font-semibold text-gray-700 hover:bg-gray-200 hover:scale-105 transition-transform mr-4"
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="Orders Icon" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
