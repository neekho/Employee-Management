import React, { useRef, useState, useEffect } from "react";
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
  const toggleVisibility = () => {
    setHide((prevState) => {
      return !prevState;
    });
  };

  const [hide, setHide] = useState(true);

  const userRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiService.post("/login", { email, password });
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      setEmail("");
      setPassword("");
      // Store tokens in localStorage

      navigate("/dashboard");
    } catch (err) {
      console.error("Login failed", err);

      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current?.focus();
    }
  };
  const handleEmailInput = (e) => setEmail(e.target.value);
  const handlePwdInput = (e) => setPassword(e.target.value);
  const errClass = errMsg ? "errmsg" : "offscreen";

  return (
    <GuestLayout>
      <div className="login-page">
        <div className="login-heading ">
          <h1 className="">Login</h1>
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>

          <form className="login-form" method="POST" onSubmit={handleSubmit}>
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
              onChange={handleEmailInput} // update the email state on change
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
                onChange={handlePwdInput} // update the email state on change
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
