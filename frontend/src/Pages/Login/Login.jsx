import React, { useState } from "react";
import { Link } from "react-router-dom";
import GuestLayout from "../../Layouts/GuestLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import "./Login.css";

const Login = () => {
  const [hide, setHide] = useState(true);

  const toggleVisibility = () => {
    setHide((prevState) => {
      return !prevState;
    });
  };

  return (
    <GuestLayout>
      <div className="login-page">
        <div className="login-heading ">
          <h1 className="">Login</h1>
          <form action="" className="login-form">
            <label className="mt-4" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your Email"
              autoComplete="off"
            />
            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                type={hide ? "password" : "text"}
                name="password"
                placeholder="Enter your password"
                autoComplete="off"
              />

              <FontAwesomeIcon
                className="absolute top-0 right-0 p-3 text-xl text-violet-500"
                icon={hide ? faEyeSlash : faEye}
                onClick={toggleVisibility}
              />
            </div>
            <button className="submit" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Login;
