import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://todo.api.devcode.gethired.id/",
});


export { axiosInstance };

