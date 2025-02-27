import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";
const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


 

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      console.log(response);
      

      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.mesasge);
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center w-full bg-gradient-to-r from-blue-200 to-indigo-300">
      <div className="bg-white shadow-2xl rounded-xl px-12 py-10 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
          ADMIN PANEL
        </h1>

        <form onSubmit={onSubmitHandler}>
          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Email Address
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="rounded-lg w-full px-4 py-3 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              type="email"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-5">
            <label className="text-sm font-medium text-gray-700 mb-2 block">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="rounded-lg w-full px-4 py-3 border border-gray-300 outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white font-semibold py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
