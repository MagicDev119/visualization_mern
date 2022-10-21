import authHeader from "./AuthHeader";
import axios from "axios";

const get = id => {
    return axios.get(`/user`)
        .then((response) => {
            return response.data;
        });
};

const login = data => {
    return axios.post("/user/login", data)
        .then((response) => {
            axios.defaults.headers.Authorization = `${response.data.token}`
            return response.data;
        });
};

const signup = data => {
    return axios.post("/user", data)
        .then((response) => {
            axios.defaults.headers.Authorization = `${response.data.token}`
            return response.data;
        });
};

const update = (data) => {
    return axios.put(`/user`, data)
        .then((response) => {

            return response.data;
        });
};

const logout = name => {
    return axios.get(`/user/logout`)
        .then((response) => {
            localStorage.removeItem("user");
            return response.data;
        });
};

const UserService = {
    login,
    get,
    signup,
    update,
    logout
};

export default UserService;