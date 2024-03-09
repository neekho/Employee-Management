import { store } from "../../app/store";

import { employeesApiSlice } from "../employees/employeeApiSlice";

import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    console.log("subscribing");
    const employees = store.dispatch(
      employeesApiSlice.endpoints.getUsers.initiate()
    );

    return () => {
      console.log("unsubscribing");
      employees.unsubscribe();
    };
  }, []);

  return <Outlet />;
};
export default Prefetch;
