import axios from "axios";
import { API_ENDPOINT } from "./apiEndpoint";
axios.defaults.withCredentials = true;

const getCurrentUser = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/current-user`);
    return response;
  } catch (err) {
    return err.response;
  }
};

const loginUser = async (args) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/login`, args);
    return response;
  } catch (err) {
    return err.response;
  }
};

const registerUser = async (args) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/register`, args);
    return response;
  } catch (err) {
    return err.response;
  }
};

const logoutUser = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/logout`);
    return response;
  } catch (err) {
    return err.response;
  }
};

export const authAPI = {
  getCurrentUser,
  registerUser,
  logoutUser,
  loginUser,
};
