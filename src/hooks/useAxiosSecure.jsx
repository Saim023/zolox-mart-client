import axios from "axios";
import React from "react";

const axiosSecure = axios.create({
  baseURL: "https://zolox-mart-server.onrender.com",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
