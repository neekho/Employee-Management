import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// layout
import GuestLayout from "../../Layouts/GuestLayout";

// css
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

// Backend service
import apiService from "../../apiService";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const [hide, setHide] = useState(true);

  const toggleVisibility = () => {
    setHide((prevState) => {
      return !prevState;
    });
  };

  const handleLogin = async () => {
    try {
      const response = await apiService.post("/login", { email, password });
      const { accessToken, refreshToken } = response.data;

      console.log("Login successful!");
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("AccessToken:", accessToken);
      console.log("RefreshToken:", refreshToken);

      // Store tokens in localStorage
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      navigate("/dashboard");

      // Redirect or update state as needed
    } catch (error) {
      // Handle login failure
      console.error("Login failed", error);
    }
  };

  return (
    <GuestLayout>
      <div className="login-page">
        <div className="login-heading ">
          <h1 className="">Login</h1>
          <form action="/login" method="POST" className="login-form">
            <label className="mt-4" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your Email"
              autoComplete="off"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // update the email state on change
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
                onChange={(e) => setPassword(e.target.value)} // update the email state on change
              />

              <FontAwesomeIcon
                className="absolute top-0 right-0 p-3 text-xl text-violet-500"
                icon={hide ? faEyeSlash : faEye}
                onClick={toggleVisibility}
              />
            </div>
            <button className="submit" type="submit" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Login;
