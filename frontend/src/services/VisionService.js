import axios from "axios";
import authHeader from "./AuthHeader";

const getAll = () => {
  return axios.get("/visualization", { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const get = id => {
  return axios.get(`/visualization/${id}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const create = data => {
  return axios.post("/visualization", data, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const update = (id, data) => {
  return axios.put(`/visualization/${id}`, data, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const findByName = name => {
  return axios.get(`/visualization?name=${name}`, { headers: authHeader() })
    .then((response) => {
      return response.data;
    });
};

const VisionService = {
  getAll,
  get,
  create,
  update,
  findByName
};

export default VisionService;