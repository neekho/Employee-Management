import React, { useRef, useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import AuthenticatedLayout from "../../Layouts/AuthenticatedLayout";

import "./AdminRegister.css";

import apiService from "../../apiService";

const AdminRegister = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [position, setPosition] = useState("");
  const [department, setDepartment] = useState("");
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [firstName, lastName, contactNumber, position, department]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      firstName,
      lastName,
      contactNumber,
      position,
      department,
    };

    try {
      const response = await apiService.post("/employee/add", employeeData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      console.log("Employee added successfully:", response.data);

      navigate("/dashboard");
    } catch (err) {
      console.error("employee creation failed", err);
      if (!err.status) {
        setErrMsg("No Server Response");
      } else if (err.status === 400) {
        setErrMsg("Missing Fields");
      } else if (err.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg(err.data?.message);
      }
      errRef.current?.focus();
    }
  };

  const handleFirstName = (e) => setFirstName(e.target.value);
  const handleLastName = (e) => setLastName(e.target.value);
  const handleContactNumber = (e) => setContactNumber(e.target.value);
  const handlePosition = (e) => setPosition(e.target.value);
  const handleDepartment = (e) => setDepartment(e.target.value);
  const errClass = errMsg ? "errmsg" : "offscreen";

  return (
    <AuthenticatedLayout>
      <div className="signup-page">
        <div className="signup-heading ">
          <h1 className="">Create an employee</h1>
          <p ref={errRef} className={errClass} aria-live="assertive">
            {errMsg}
          </p>

          <form className="signup-form" method="POST" onSubmit={handleSubmit}>
            <label className="mt-4" htmlFor="Firstname">
              Firstname
            </label>
            <input
              id="firstname"
              type="text"
              name="Firstname"
              placeholder="Enter first name"
              autoComplete="off"
              value={firstName}
              onChange={handleFirstName}
            />
            <label className="mt-4" htmlFor="Lastname">
              Lastname
            </label>
            <input
              id="lastname"
              type="text"
              name="Lastname"
              placeholder="Enter last name"
              autoComplete="off"
              value={lastName}
              onChange={handleLastName}
            />
            <label className="mt-4" htmlFor="contact">
              Contact Number
            </label>
            <input
              id="contact"
              type="tel"
              name="contact"
              placeholder="Enter contact number"
              autoComplete="off"
              value={contactNumber}
              onChange={handleContactNumber}
            />

            <label className="mt-4" htmlFor="position">
              Position
            </label>
            <input
              id="position"
              type="text"
              name="position"
              placeholder="Enter employee role"
              autoComplete="off"
              value={position}
              onChange={handlePosition}
            />

            <label className="mt-4" htmlFor="department">
              Department
            </label>
            <input
              id="department"
              type="text"
              name="department"
              placeholder="Enter employee department"
              autoComplete="off"
              value={department}
              onChange={handleDepartment}
            />

            <button className="submit" type="submit">
              Create
            </button>
          </form>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default AdminRegister;
