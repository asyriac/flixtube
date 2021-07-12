import { useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router";
import { usePlaylistContext } from "../../contexts/playlist-context";
import PlaylistModal from "../PlaylistModal/PlaylistModal";
import "./PlaylistView.css";
import { findPlaylistDetails } from "../../utils/playlist-utils";
import { useVideoContext } from "../../contexts/video-context";
import useFetchUserPlaylists from "../../hooks/useFetchUserPlaylists";

const PlaylistView = () => {
  const [show, setShow] = useState(false);
  const { playlistId, videoId } = useParams();
  const { liked, bookmarked, userplaylists, addToLikedVideos, removeFromLikedVideos, addToBookmarkedVideos, removeFromBookmarkedVideos } = usePlaylistContext();
  const { videos } = useVideoContext();
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

  const currentVideo = videos.find((item) => item._id === videoId);
  const isLiked = liked.videos.find((item) => item._id === videoId);
  const isBookmarked = bookmarked.videos.find((item) => item._id === videoId);
  const navigate = useNavigate();

  const handlePlaylistVideo = (item) => {
    navigate(`/playlists/${playlistId}/${item._id}`);
  };

  const handleRemoveFromLikedVideos = () => {
    removeFromLikedVideos(currentVideo);
  };

  const handleAddToLikedVideos = () => {
    addToLikedVideos(currentVideo);
  };

  const handleRemoveFromBookmarkedVideos = () => {
    removeFromBookmarkedVideos(currentVideo);
  };

  const handleAddToBookmarkedVideos = () => {
    addToBookmarkedVideos(currentVideo);
  };

  return (
    <>
      {playlistDetails === undefined || currentVideo === undefined ? (
        <h1>Loading1...</h1>
      ) : (
        <div className="video-notes-container pt-1">
          <div className="playlist-video">
            <div className="video-player">
              <ReactPlayer width="100%" height="100%" controls url={`https://www.youtube.com/watch?v=${currentVideo.url}`} />
            </div>

            <div className="video-details">
              <h1>{currentVideo?.title}</h1>
              <div className="video-details-icons">
                {isLiked ? <i class="fas fa-thumbs-up" onClick={handleRemoveFromLikedVideos}></i> : <i className="far fa-thumbs-up" onClick={handleAddToLikedVideos}></i>}
                {isBookmarked ? (
                  <i class="fas fa-bookmark" onClick={handleRemoveFromBookmarkedVideos}></i>
                ) : (
                  <i className="far fa-bookmark" onClick={handleAddToBookmarkedVideos}></i>
                )}
                <i className="fas fa-clipboard-list" onClick={() => setShow(true)}></i>
              </div>
            </div>
          </div>
          <div className="playlist-videos-list">
            {playlistDetails.videos.map((item) => {
              return (
                <div className={`playlist-videos-list-item ${item._id === currentVideo._id && "playlist-item-active"}`} onClick={() => handlePlaylistVideo(item)}>
                  <img src={item.thumbnail} alt={item.title} />
                  <h4>{item.title}</h4>
                </div>
              );
            })}
          </div>
          <PlaylistModal onClick={() => setShow(false)} show={show} videoDetails={currentVideo} title="Save to...">
            {userplaylists}
          </PlaylistModal>
        </div>
      )}
    </>
  );
};

export default PlaylistView;
