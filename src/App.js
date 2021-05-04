import { Routes,Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import VideoList from "./components/VideoList/VideoList";
import Video from "./components/Video/Video";

function App() {
  return (
    <>
     <Navbar />
     <div className="container">
       <Routes>
         <Route path="/" element={<VideoList />}/>
         <Route path="/video/:videoId" element={<Video />} />
       </Routes>
     </div>
    </>
  );
}

export default App;
