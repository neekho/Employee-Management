import React, { useState } from "react";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";

// Layout
import GuestLayout from "../../Layouts/GuestLayout";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import apiService from "../../apiService";
// CSS
import "../AdminRegister/AdminRegister.css";

const AccountCreation = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const [hide, setHide] = useState(true);

  const toggleVisibility = () => {
    setHide((prevState) => {
      return !prevState;
    });
  };

  const handleSignUp = async (event) => {
    event.preventDefault();

    const adminData = {
      email,
      password,
      role,
    };

    try {
      const response = await apiService.post("user/register", adminData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      console.log("created admin:", response.data);
      navigate("/dashboard");
    } catch (error) {
      console.error("Error in creating admin account", error);
    }
  };
  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleRole = (e) => setRole(e.target.value);

  return (
    <GuestLayout>
      <div className="signup-page">
        <div className="signup-heading ">
          <h1 className="">Create admin</h1>
          {/* <p>
            Already have an account?
            <Link to="/" className="ms-1 text-violet-500">
              Login Here!
            </Link>
          </p> */}

          <form className="signup-form" method="POST" onSubmit={handleSignUp}>
            <label className="mt-4" htmlFor="Email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="Email"
              placeholder="Enter email"
              autoComplete="off"
              value={email}
              onChange={handleEmail}
            />

            <label className="mt-4" htmlFor="Role">
              Role
            </label>
            <input
              id="role"
              type="text"
              name="Role"
              placeholder="Enter role"
              autoComplete="off"
              value={role}
              onChange={handleRole}
            />

            <label htmlFor="password">Password</label>
            <div className="relative">
              <input
                id="password"
                type={hide ? "password" : "text"}
                name="password"
                placeholder="Enter your password"
                autoComplete="off"
                value={password}
                onChange={handlePassword}
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
              Create
            </button>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
};

export default AccountCreation;
