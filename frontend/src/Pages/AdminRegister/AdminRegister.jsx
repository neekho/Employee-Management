import React, { useState } from "react";
import GuestLayout from "../../Layouts/GuestLayout";
import { Link } from "react-router-dom";
import "./AdminRegister.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const AdminRegister = () => {
  const [hide, setHide] = useState(true);

  const toggleVisibility = () => {
    setHide((prevState) => {
      return !prevState;
    });
  };

  return (
    <GuestLayout>
      <div className="signup-page">
        <div className="signup-heading ">
          <h1 className="">Get's Started.</h1>
          <p>
            Don't Have an account?
            <Link to="/login" className="ms-1 text-violet-500">
              Login Here!
            </Link>
          </p>

          <form action="" className="signup-form">
            <label className="mt-4" htmlFor="Firstname">
              Firstname
            </label>
            <input
              id="firstname"
              type="text"
              name="Firstname"
              placeholder="Enter your first name"
              autoComplete="off"
            />
            <label className="mt-4" htmlFor="Lastname">
              Lastname
            </label>
            <input
              id="lastname"
              type="text"
              name="Lastname"
              placeholder="Enter your last name"
              autoComplete="off"
            />
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
            <label htmlFor="retype_password">Retype Password</label>
            <div className="relative">
              <input
                id="retype_password"
                type={hide ? "password" : "text"}
                name="retype_password"
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
              Sign up
            </button>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
};

export default AdminRegister;
