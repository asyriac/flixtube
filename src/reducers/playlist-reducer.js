const initialState = {
  liked: {
    title: "Liked videos",
    videos: [],
  },
  bookmarked: {
    title: "Bookmarked videos",
    videos: [],
  },
  userplaylists: [],
  playlistLoading: true,
};

const playlistReducer = (state, action) => {
  switch (action.type) {
    case "GET_USER_PLAYLIST":
      return {
        ...state,
        liked: {
          ...state.liked,
          videos: action.payload.liked.videos,
        },
        bookmarked: {
          ...state.bookmarked,
          videos: action.payload.bookmarked.videos,
        },
        userplaylists: action.payload.customlists,
        playlistLoading: false,
      };
    case "ADD_TO_LIKED_VIDEOS":
      return {
        ...state,
        liked: {
          ...state.liked,
          videos: state.liked.videos.concat(action.payload),
        },
      };
    case "REMOVE_FROM_LIKED_VIDEOS":
      return {
        ...state,
        liked: {
          ...state.liked,
          videos: state.liked.videos.filter((item) => item.id !== action.payload.id),
        },
      };
    case "ADD_TO_BOOKMARKED_VIDEOS":
      return {
        ...state,
        bookmarked: {
          ...state.bookmarked,
          videos: state.bookmarked.videos.concat(action.payload),
        },
      };
    case "REMOVE_FROM_BOOKMARKED_VIDEOS":
      return {
        ...state,
        bookmarked: {
          ...state.bookmarked,
          videos: state.bookmarked.videos.filter((item) => item.id !== action.payload.id),
        },
      };
    case "ADD_NEW_PLAYLIST":
      return {
        ...state,
        userplaylists: state.userplaylists.concat(action.payload),
      };
    case "ADD_TO_PLAYLIST":
      return {
        ...state,
        userplaylists: state.userplaylists.map((playlist) => {
          if (playlist._id === action.payload.playlistId) {
            return {
              ...playlist,
              videos: playlist.videos.concat(action.payload.video),
            };
          }
          return playlist;
        }),
      };
    case "REMOVE_FROM_PLAYLIST":
      return {
        ...state,
        userplaylists: state.userplaylists.map((playlist) => {
          if (playlist._id === action.payload.playlistId) {
            return {
              ...playlist,
              videos: playlist.videos.filter((item) => item._id !== action.payload.video._id),
            };
          }
          return playlist;
        }),
      };
    default:
      return state;
  }
};

export { initialState, playlistReducer };
