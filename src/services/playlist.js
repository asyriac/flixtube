import axios from "axios";
import { API_ENDPOINT } from "./apiEndpoint";
axios.defaults.withCredentials = true;

const likeVideo = async (args) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/playlists/liked`, args);
    return response;
  } catch (err) {
    return err.response;
  }
};

const bookmarkVideo = async (args) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/playlists/bookmarked`, args);
    return response;
  } catch (err) {
    return err.response;
  }
};

const fetchUserPlaylists = async () => {
  try {
    const response = await axios.get(`${API_ENDPOINT}/playlists`);
    return response;
  } catch (err) {
    return err.response;
  }
};

const createNewPlaylist = async (args) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/playlists`, args);
    return response;
  } catch (err) {
    return err.response;
  }
};

const addVideoToPlaylist = async (playlistID, args) => {
  try {
    const response = await axios.post(`${API_ENDPOINT}/playlists/${playlistID}`, args);
    return response;
  } catch (err) {
    console.dir(err);
    return err.response;
  }
};

export const playlistAPI = {
  likeVideo,
  fetchUserPlaylists,
  bookmarkVideo,
  createNewPlaylist,
  addVideoToPlaylist,
};
