import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./contexts/auth-context";
import { PlaylistContextProvider } from "./contexts/playlist-context";
import { VideoContextProvider } from "./contexts/video-context";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <VideoContextProvider>
          <PlaylistContextProvider>
            <App />
          </PlaylistContextProvider>
        </VideoContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
