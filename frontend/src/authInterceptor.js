import axios from "axios";

// authInterceptor.js
const authInterceptor = (accessToken) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default authInterceptor;
