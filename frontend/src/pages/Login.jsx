import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [currentState, setCurrentState] = useState("login");
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  console.log("Backend URL:", backendUrl);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "signup") {
        const response = await axios.post(backendUrl + "/api/user/register", {
          name,
          email,
          password,
        });

        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(backendUrl + "/api/user/login", {
          email,
          password,
        });
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(()=>{
    if(token){
      navigate("/")
    }
  },[token])

  return (
    <form
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-10 gap-4 text-gray-700"
      onSubmit={onSubmitHandler}
    >
      {/* Title with Divider */}
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">
          {currentState === "login" ? "Login" : "Sign Up"}
        </p>
        <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
      </div>

      {/* Show Name Input Only in Sign-Up Mode */}
      {currentState === "signup" && (
        <input
          type="text"
          className="w-full px-3 py-2 border border-gray-800"
          placeholder="Name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      )}

      {/* Email Input */}
      <input
        type="email"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Email"
        required
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />

      {/* Password Input */}
      <input
        type="password"
        className="w-full px-3 py-2 border border-gray-800"
        placeholder="Password"
        required
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />

      {/* Actions (Forgot Password / Switch Forms) */}
      <div className="w-full flex justify-between text-sm mt-[-8px] cursor-pointer">
        <p>Forgot your password?</p>

        {currentState === "login" ? (
          <p
            onClick={() => setCurrentState("signup")}
            className="text-blue-500 hover:underline"
          >
            Create an account
          </p>
        ) : (
          <p
            onClick={() => setCurrentState("login")}
            className="text-blue-500 hover:underline"
          >
            Already have an account? Login here
          </p>
        )}
      </div>
      <button className="bg-black text-white font-light px-8 py-2">
        {currentState === "login" ? "Login" : "Sign Up"}
      </button>
    </form>
  );
};

export default Login;
