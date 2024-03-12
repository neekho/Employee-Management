import React, { useState } from "react";

import ReusableInput from "./ReusableInput";

import "./ReusableForm.css";

const ReusableForm = ({ title, btnText, onSubmit, initialValues = {} }) => {
  const [formData, setFormData] = useState(initialValues);

  console.log(formData);

  const handleSubmit = (event) => {
    event.preventDefault();

    onSubmit(formData);
  };

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData((prevValue) => ({ ...prevValue, [name]: value }));
  }

  return (
    <div className="signup-page">
      <div className="signup-heading ">
        <h1 className="">{title}</h1>

        <form className="signup-form" method="POST" onSubmit={handleSubmit}>
          <ReusableInput
            id={"firstName"}
            label="Firstname"
            type={"text"}
            name={"firstName"}
            placeholder={"Enter first name"}
            value={formData.firstName}
            onChange={handleChange}
          />

          <ReusableInput
            id={"lastName"}
            label="Lastname"
            type={"text"}
            name={"lastName"}
            placeholder={"Enter last name"}
            value={formData.lastName}
            onChange={handleChange}
          />

          <ReusableInput
            id={"contactNumber"}
            label="Contact Number"
            type={"tel"}
            name={"contactNumber"}
            placeholder={"Enter contact number"}
            value={formData.contactNumber}
            onChange={handleChange}
          />

          <ReusableInput
            id={"position"}
            label="Position"
            type={"text"}
            name={"position"}
            placeholder={"Enter position number"}
            value={formData.position}
            onChange={handleChange}
          />

          <ReusableInput
            id={"department"}
            label="Department"
            type={"text"}
            name={"department"}
            placeholder={"Enter department number"}
            value={formData.department}
            onChange={handleChange}
          />

          <button className="submit" type="submit">
            {btnText}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReusableForm;
