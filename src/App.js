import { Routes,Route } from "react-router";
import Navbar from "./components/Navbar/Navbar";
import VideoList from "./components/VideoList/VideoList";

function App() {
  return (
    <>
     <Navbar />
     <div className="container">
       <Routes>
         <Route path="/" element={<VideoList />}/>
       </Routes>
     </div>
    </>
  );
}

export default App;
