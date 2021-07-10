import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, playlistReducer } from "../reducers/playlist-reducer";
import axios from "axios";
import { playlistAPI } from "../services";

const PlaylistContext = createContext();

const PlaylistContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playlistReducer, initialState);

  const getUserPlaylist = async () => {
    const res = await playlistAPI.fetchUserPlaylists();
    dispatch({ type: "GET_USER_PLAYLIST", payload: res.data.data });
  };

  const addToLikedVideos = async (item) => {
    dispatch({ type: "ADD_TO_LIKED_VIDEOS", payload: item });
    await playlistAPI.likeVideo({ videoID: item._id });
  };

  const removeFromLikedVideos = async (item) => {
    dispatch({ type: "REMOVE_FROM_LIKED_VIDEOS", payload: item });
    await playlistAPI.likeVideo({ videoID: item._id });
  };

  const addToBookmarkedVideos = async (item) => {
    dispatch({ type: "ADD_TO_BOOKMARKED_VIDEOS", payload: item });
    await playlistAPI.bookmarkVideo({ videoID: item._id });
  };

  const removeFromBookmarkedVideos = async (item) => {
    dispatch({ type: "REMOVE_FROM_BOOKMARKED_VIDEOS", payload: item });
    await playlistAPI.bookmarkVideo({ videoID: item._id });
  };

  const addNewPlaylist = async (item) => {
    dispatch({ type: "ADD_NEW_PLAYLIST", payload: item });
    await playlistAPI.createNewPlaylist({ title: item });
  };

  const addToPlaylist = async (video, playlistId) => {
    dispatch({ type: "ADD_TO_PLAYLIST", payload: { video, playlistId } });
    await playlistAPI.addVideoToPlaylist(playlistId, { videoID: video._id });
  };

  const removeFromPlaylist = async (video, playlistId) => {
    dispatch({ type: "REMOVE_FROM_PLAYLIST", payload: { video, playlistId } });
    await playlistAPI.addVideoToPlaylist(playlistId, { videoID: video._id });
  };

  return (
    <PlaylistContext.Provider
      value={{
        ...state,
        getUserPlaylist,
        addToLikedVideos,
        removeFromLikedVideos,
        addToBookmarkedVideos,
        removeFromBookmarkedVideos,
        addNewPlaylist,
        addToPlaylist,
        removeFromPlaylist,
      }}
    >
      {children}
    </PlaylistContext.Provider>
  );
};

const usePlaylistContext = () => useContext(PlaylistContext);

export { PlaylistContextProvider, usePlaylistContext };
