import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import MyButton from "../../components/button";
import DarkModeButton from "../../components/darkMode"
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";

import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     dispatch(loginStart());
//     try {
//       const res = await axios.post("/v1/auth/signup", { email, firstName, surname, username, password, birthDate });
//       dispatch(loginSuccess(res.data));
//       navigate("/signin");
//     } catch (err) {
//       dispatch(loginFailed());
//     }
//   };
const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(loginStart());
    try {
      const res = await axios.post("/v1/auth/signup", {
        email,
        firstName,
        surname,
        username,
        password,
        birthDate,
      });
      dispatch(loginSuccess(res.data));
      navigate("/signin");
    } catch (err) {
      dispatch(loginFailed());
    }
  };
  
  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden dark:bg-secondaryBackgroundDark">      
      <div className="w-full p-6 m-auto border-2 border-accent bg-backgroundLight dark:bg-backgroundDark dark:text-textLight rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-textLight dark:text-textDark">
          Sign Up
        </h1>
        <form className="mt-6">
          <div className="mb-2">
            <label htmlFor="username" className="block text-sm font-semibold text-textLight dark:text-textDark">
              Username
            </label>
            <input
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              className="block w-full px-4 py-2 mt-2 text-textLight dark:text-textDark dark:bg-inputDark rounded-md focus:border-accent focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-99"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="email" className="block text-sm font-semibold text-textLight dark:text-textDark">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="block w-full px-4 py-2 mt-2 text-textLight dark:text-textDark dark:bg-inputDark rounded-md focus:border-accent focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-99"
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-textLight dark:text-textDark">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="block w-full px-4 py-2 mt-2 dark:text-textDark dark:bg-inputDark rounded-md focus:border-accent focus:ring-accent focus:outline-none focus:ring focus:ring-opacity-99"
            />
          </div>
          <div className="mt-6 flex flex-col items-center">
            <button onClick={handleSignup} className="text-textDark dark:text-textDark bg-accent hover:bg-accentHover font-bold py-2 px-4 rounded-full">
              Signup
            </button>
          </div>
        </form>
  
        <p className="mt-8 text-xs font-light text-center text-textLight dark:text-textDark">
          {" "}
          Already have an account{" "}
          <a href="/signin" className="font-medium text-accent dark:text-accent hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );  
};

export default Signup;