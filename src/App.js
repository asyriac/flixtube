import { Routes, Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import VideoList from "./components/VideoList/VideoList";
import Video from "./components/Video/Video";
import Playlist from "./components/Playlist/Playlist";
import PlaylistView from "./components/PlaylistView/PlaylistView";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PlaylistDetails from "./components/PlaylistDetails/PlaylistDetails";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import { useAuthContext } from "./contexts/auth-context";
import Loading from "./components/Loading/Loading";
import Logout from "./components/Logout/Logout";
import useFetchCurrentUser from "./hooks/useFetchCurrentUser";
import { usePlaylistContext } from "./contexts/playlist-context";
import { useEffect } from "react";
import useFetchUserPlaylists from "./hooks/useFetchUserPlaylists";

function App() {
  const { initialLoading, isLoggedIn } = useAuthContext();
  const { getUserPlaylist } = usePlaylistContext();

  useFetchCurrentUser();
  if (initialLoading) return <Loading />;
  return (
    <>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/video/:videoId" element={<Video />} />
          <PrivateRoute path="/playlists" element={<Playlist />} />
          <PrivateRoute path="/playlists/:playlistId" element={<PlaylistDetails />} />
          <PrivateRoute path="/playlists/:playlistId/:videoId" element={<PlaylistView />} />
          <PrivateRoute path="/logout" element={<Logout />} />
        </Routes>
      </div>
      <ToastContainer position="bottom-left" />
    </>
  );
}

export default App;
