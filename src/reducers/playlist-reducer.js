import { v4 as uuid } from 'uuid';


const playlistReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_LIKED_VIDEOS":
            return {
                ...state,
                liked: {
                    ...state.liked,
                    videos: state.liked.videos.concat(action.payload)
                }
            }
        case "REMOVE_FROM_LIKED_VIDEOS":
            return {
                ...state,
                liked: {
                    ...state.liked,
                    videos: state.liked.videos.filter((item) => item.id !== action.payload.id)
                }
            }
        case "ADD_TO_BOOKMARKED_VIDEOS":
            return {
                ...state,
                bookmarked: {
                    ...state.bookmarked,
                    videos: state.bookmarked.videos.concat(action.payload)
                }
            }
        case "REMOVE_FROM_BOOKMARKED_VIDEOS":
            return {
                ...state,
                bookmarked: {
                    ...state.bookmarked,
                    videos: state.bookmarked.videos.filter((item) => item.id !== action.payload.id)
                }
            }
        case "ADD_NEW_PLAYLIST":
            return {
                ...state,
                "userplaylists" : state.userplaylists.concat( { id:uuid(), title: action.payload, videos:[]})
            }
        case "ADD_TO_PLAYLIST":
            return {
                ...state,
                userplaylists: state.userplaylists.map((playlist)=> {
                    if(playlist.id === action.payload.playlistId)
                    {
                        return {
                            ...playlist,
                            videos: playlist.videos.concat(action.payload.video)
                        }
                    }
                    return playlist
                })
            }
        default:
            return state
    }
}

export {initialState, playlistReducer}