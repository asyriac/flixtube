import { Routes,Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import VideoList from "./components/VideoList/VideoList";
import Video from "./components/Video/Video";
import Playlist from "./components/Playlist/Playlist";
import PlaylistView from "./components/PlaylistView/PlaylistView";
import LikedVideosView from "./components/LikedVideosView/LikedVideosView";
import BookmarkedVideosView from "./components/BookmarkedVideosView/BookmarkedVideosView";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
     <Navbar />
     <div className="container">
       <Routes>
         <Route path="/" element={<VideoList />}/>
         <Route path="/video/:videoId" element={<Video />} />
         <Route path="/playlists" element={<Playlist />} />
         <Route path="/playlists/liked/:videoId" element={<LikedVideosView />} />
         <Route path="/playlists/bookmarked/:videoId" element={<BookmarkedVideosView/>} />
         <Route path="/playlists/:playlistId/:videoId" element={<PlaylistView/>} />
       </Routes>
     </div>
     <ToastContainer />
    </>
  );
}

export default App;
