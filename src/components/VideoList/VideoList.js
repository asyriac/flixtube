import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth-context";
import { usePlaylistContext } from "../../contexts/playlist-context";
import { useVideoContext } from "../../contexts/video-context";
import useFetchUserPlaylists from "../../hooks/useFetchUserPlaylists";
import Loading from "../Loading/Loading";
import "./VideoList.css";

const VideoList = () => {
  const { loading, videos } = useVideoContext();
  const { isLoggedIn } = useAuthContext();
  const { playlistLoading } = usePlaylistContext();

  const navigate = useNavigate();

  useFetchUserPlaylists();

  const handleClick = (id) => {
    navigate(`/video/${id}`);
  };

  if (isLoggedIn && playlistLoading) return <Loading />;

  if (loading) return <Loading />;

  return (
    <>
      <div className="card-list row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 pt-1">
        {videos.map((item) => {
          return (
            <div key={item._id} className="card" onClick={() => handleClick(item._id)}>
              <img src={item.thumbnail} alt={item.title} />
              <div className="card-content">
                <h3>{item.title}</h3>
                <div className="flex mt-md">
                  <img src={item.channelImage} className="img-round" alt={item.channelName} />
                  <div>
                    <span className="ml-sm">{item.channelName}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default VideoList;
