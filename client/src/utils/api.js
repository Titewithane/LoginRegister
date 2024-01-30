import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/",
});

//? Add a request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config; //? err.config is the information of request e.g. method headers data etc.

    if (error.response.status === 401 && !originalRequest._retry) {
      //? if originalRequest._retry is not exists it's mean token is expired
      originalRequest._retry = true; //? assign value for _retry and then _retry is exists and if next time _retry is exists but we still get 400 then Promise should be reject

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(
          "http://localhost:5000/api/refreshToken",
          refreshToken
        );
        const { token } = response.data;
      } catch (error) {
        return window.location.href("/login");
      }
    }
  }
);

export default api;
