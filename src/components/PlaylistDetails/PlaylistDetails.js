import { useLocation, useNavigate, useParams } from "react-router";
import { usePlaylistContext } from "../../contexts/playlist-context";
import { findPlaylistDetails } from "../../utils/playlist-utils";
import placeholder from "../../images/placeholder.png";
import "./PlaylistDetails.css";
import useFetchUserPlaylists from "../../hooks/useFetchUserPlaylists";
import Loading from "../Loading/Loading";

const PlaylistDetails = () => {
  const { playlistId } = useParams();
  const { liked, bookmarked, userplaylists, playlistLoading } = usePlaylistContext();
  const navigate = useNavigate();
  useFetchUserPlaylists();
  let playlistDetails;
  switch (playlistId) {
    case "liked":
      playlistDetails = JSON.parse(JSON.stringify(liked));
      break;
    case "bookmarked":
      playlistDetails = JSON.parse(JSON.stringify(bookmarked));
      break;
    default:
      playlistDetails = findPlaylistDetails(playlistId, userplaylists);
      break;
  }

  const { videos: playlistVideos } = playlistDetails || {};

  const handleNavigateToPlaylistVideo = (item) => {
    navigate(`/playlists/${playlistId}/${item._id}`);
  };

  if (playlistLoading) return <Loading />;

  return (
    <>
      {playlistVideos === undefined ? (
        <h1>Loading...</h1>
      ) : (
        <div className="pt-1 flex flex-align-items-start">
          <div className="card playlist-card ">
            <img src={playlistVideos.length > 0 ? playlistVideos[0].thumbnail : placeholder} alt={playlistVideos.length > 0 ? playlistVideos[0].title : placeholder} />
            <div className="card-content">
              <h3>{playlistDetails.title}</h3>
            </div>
          </div>
          <div className="flex-1 pl-1">
            {playlistVideos.length > 0 ? (
              playlistVideos.map((item) => {
                return (
                  <div className="playlist-videos-list-item" onClick={() => handleNavigateToPlaylistVideo(item)}>
                    <img src={item.thumbnail} alt={item.title} />
                    <h4>{item.title}</h4>
                  </div>
                );
              })
            ) : (
              <h3 className="text-center">Playlist is empty. </h3>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default PlaylistDetails;
