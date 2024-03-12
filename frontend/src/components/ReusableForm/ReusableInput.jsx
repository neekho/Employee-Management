import React from "react";

const ReusableInput = ({
  id,
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <>
      <label className="mt-4" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        onChange={onChange}
      />
    </>
  );
};

export default ReusableInput;
