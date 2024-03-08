import axios from "axios";

const authInterceptor = (accessToken) => {
  axios.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.log(accessToken);
      console.log(config);
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export default authInterceptor;
