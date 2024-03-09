import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setCredentials } from "../auth/authSlice";
import { useLoginMutation } from "../auth/authApiSlice";

// layout
import GuestLayout from "../../Layouts/GuestLayout";

// css
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

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
  const dispatch = useDispatch();

  const [login, { isLoading, isSuccess }] = useLoginMutation();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { accessToken } = await login({ email, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      setEmail("");
      setPassword("");

      if (isSuccess) navigate("/dashboard");
    } catch (err) {
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

  if (isLoading) return <p>Loading...</p>;

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
              autoComplete="on"
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

            {isLoading && <p>Loading...</p>}
          </form>
        </div>
      </div>
    </GuestLayout>
  );
};

export default Login;
