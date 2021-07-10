import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams, Navigate } from "react-router";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/auth-context";
import { usePlaylistContext } from "../../contexts/playlist-context";
import { useVideoContext } from "../../contexts/video-context";
import useFetchUserPlaylists from "../../hooks/useFetchUserPlaylists";
import Loading from "../Loading/Loading";
import PlaylistModal from "../PlaylistModal/PlaylistModal";
import "./Video.css";

const Video = () => {
  const { loading, videos: data } = useVideoContext();
  const { playlistLoading } = usePlaylistContext();
  const { isLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const { videoId } = useParams();
  const videoDetails = data.find((item) => item._id === videoId);
  const { liked, bookmarked, userplaylists, addToLikedVideos, removeFromLikedVideos, removeFromBookmarkedVideos, addToBookmarkedVideos } = usePlaylistContext();
  const isLiked = liked.videos.find((item) => item._id === videoId);
  const isBookmarked = bookmarked.videos.find((item) => item._id === videoId);
  useFetchUserPlaylists();

  const handleRemoveFromLikedVideos = () => {
    if (!isLoggedIn) return navigate("/login");
    removeFromLikedVideos(videoDetails);
  };

  const handleAddToLikedVideos = () => {
    if (!isLoggedIn) return navigate("/login");
    addToLikedVideos(videoDetails);
  };

  const handleRemoveFromBookmarkedVideos = () => {
    if (!isLoggedIn) return navigate("/login");
    removeFromBookmarkedVideos(videoDetails);
  };

  const handleAddToBookmarkedVideos = () => {
    if (!isLoggedIn) return navigate("/login");
    addToBookmarkedVideos(videoDetails);
  };

  if (isLoggedIn && playlistLoading) return <Loading />;

  return (
    <>
      {data.length === 0 ? (
        <h1>Loading...</h1>
      ) : (
        <div className="video-notes-container pt-1">
          <div className="">
            <div className="video-player">
              <ReactPlayer width="100%" height="100%" controls url={`https://www.youtube.com/watch?v=${videoDetails.url}`} />
            </div>

            <div className="video-details">
              <h1>{videoDetails.title}</h1>
              <div className="video-details-icons">
                {isLiked ? <i className="fas fa-thumbs-up" onClick={handleRemoveFromLikedVideos}></i> : <i className="far fa-thumbs-up" onClick={handleAddToLikedVideos}></i>}
                {isBookmarked ? (
                  <i className="fas fa-bookmark" onClick={handleRemoveFromBookmarkedVideos}></i>
                ) : (
                  <i className="far fa-bookmark" onClick={handleAddToBookmarkedVideos}></i>
                )}

                <i
                  className="fas fa-clipboard-list"
                  onClick={() => {
                    if (!isLoggedIn) return navigate("/login");
                    setShow(true);
                  }}
                ></i>
              </div>
            </div>
          </div>
          <PlaylistModal onClick={() => setShow(false)} show={show} videoDetails={videoDetails} title="Save to...">
            {userplaylists}
          </PlaylistModal>
        </div>
      )}
    </>
  );
};

export default Video;
