import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const employeesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => "/employee/employees",
      validateStatus: (response, result) => {
        return response.status === 200 && !result.isError;
      },
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((employee) => {
          employee.id = employee._id;
          return employee;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [
            { type: "Employee", id: "LIST" },
            ...result.ids.map((id) => ({ type: "Employee", id })),
          ];
        } else return [{ type: "Employee", id: "LIST" }];
      },
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/new",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "Employee", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/employee/update",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Employee", id: arg.id },
      ],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/employee/delete`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "Employee", id: arg.id },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = employeesApiSlice;

// returns the query result object
export const selectUsersResult = employeesApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(
  (state) => selectUsersData(state) ?? initialState
);
