import {createContext, useContext, useReducer} from "react";
import { initialState, playlistReducer } from "../reducers/playlist-reducer";

const PlaylistContext = createContext();

const PlaylistContextProvider = ({children}) => {


    const [state, dispatch] = useReducer(playlistReducer, initialState);

    const addToLikedVideos = (item) => {
        dispatch({type:"ADD_TO_LIKED_VIDEOS", payload:item})
    }

    const removeFromLikedVideos = (item) => {
        dispatch({type: "REMOVE_FROM_LIKED_VIDEOS", payload:item})
    }

    const addToBookmarkedVideos = (item) => {
        dispatch({type:"ADD_TO_BOOKMARKED_VIDEOS", payload:item})
    }

    const removeFromBookmarkedVideos = (item) => {
        dispatch({type: "REMOVE_FROM_BOOKMARKED_VIDEOS", payload:item})
    }

    const addNewPlaylist = (item) => {
        dispatch({type: "ADD_NEW_PLAYLIST", payload:item})
    }

    const addToPlaylist = (video,playlistId) => {
        dispatch({type: "ADD_TO_PLAYLIST", payload: {video,playlistId}})
    }

    const removeFromPlaylist = (video,playlistId) => {
        dispatch({type: "REMOVE_FROM_PLAYLIST", payload: {video,playlistId}})
    }

    return(
        <PlaylistContext.Provider value={{...state, addToLikedVideos, removeFromLikedVideos, addToBookmarkedVideos, removeFromBookmarkedVideos, addNewPlaylist,addToPlaylist,removeFromPlaylist}}>
            {children}
        </PlaylistContext.Provider>
    )
}

const usePlaylistContext = () => useContext(PlaylistContext);

export {PlaylistContextProvider, usePlaylistContext};