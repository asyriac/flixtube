import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, videoReducer } from "../reducers/video-reducer";
import axios from "axios";

const VideoContext = createContext();

const VideoContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(videoReducer, initialState);

  const getVideo = async () => {
    dispatch({ type: "LOADING" });
    const {
      data: { videos },
    } = await axios.get(`https://flixtube-backend.herokuapp.com/api/v1/videos`);
    dispatch({ type: "GET_VIDEOS", payload: videos });
  };

  useEffect(() => {
    getVideo();
  }, []);

  return <VideoContext.Provider value={{ ...state }}>{children}</VideoContext.Provider>;
};

const useVideoContext = () => useContext(VideoContext);

export { VideoContextProvider, useVideoContext };
