import { Routes,Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import VideoList from "./components/VideoList/VideoList";
import Video from "./components/Video/Video";
import Playlist from "./components/Playlist/Playlist";
import PlaylistView from "./components/PlaylistView/PlaylistView";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PlaylistDetails from "./components/PlaylistDetails/PlaylistDetails";

function App() {
  return (
    <>
     <Navbar />
     <div className="container">
       <Routes>
         <Route path="/" element={<VideoList />}/>
         <Route path="/video/:videoId" element={<Video />} />
         <Route path="/playlists" element={<Playlist />} />
         <Route path="/playlists/:playlistId" element={<PlaylistDetails/>} />
         <Route path="/playlists/:playlistId/:videoId" element={<PlaylistView/>} />
       </Routes>
     </div>
     <ToastContainer position="bottom-left"/>
    </>
  );
}

export default App;
