import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:9898",
});

export default instance;
