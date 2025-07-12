import axios from "axios";

const axiosSecure = axios.create({
  baseURL: "https://zolox-mart-server.onrender.com",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
