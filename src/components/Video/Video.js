import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import { usePlaylistContext } from "../../contexts/playlist-context";
import data from '../../data/videos'
import PlaylistModal from "../PlaylistModal/PlaylistModal";
import './Video.css'

const Video = () => {
    const [show, setShow] = useState(false);
    const { videoId } = useParams();
    const videoDetails = data.find((item) => item.id === videoId)
    const {liked,bookmarked, userplaylists, addToLikedVideos, removeFromLikedVideos, removeFromBookmarkedVideos, addToBookmarkedVideos} = usePlaylistContext();
    const isLiked = liked.videos.find((item)=> item.id === videoId)
    const isBookmarked = bookmarked.videos.find((item)=> item.id === videoId)

    const handleRemoveFromLikedVideos = () => {
        removeFromLikedVideos(videoDetails);
    }

    const handleAddToLikedVideos = () => {
        addToLikedVideos(videoDetails);
    }

    const handleRemoveFromBookmarkedVideos = () => {
        removeFromBookmarkedVideos(videoDetails);
    }

    const handleAddToBookmarkedVideos = () => {
        addToBookmarkedVideos(videoDetails);
    }



    return (
        <div className="video-notes-container pt-1">
          <div className="">
                <div className="video-player">
                    <ReactPlayer
                        width="100%"
                        height="100%"
                        controls
                        url={`https://www.youtube.com/watch?v=${videoDetails.url}`}
                    />
                </div>

                <div className="video-details">
                    <h1>{videoDetails.title}</h1>
                    <div className="video-details-icons">
                        {isLiked ?
                            <i className="fas fa-thumbs-up" onClick={handleRemoveFromLikedVideos}></i>
                            :
                            <i className="far fa-thumbs-up" onClick={handleAddToLikedVideos}></i>
                        }
                        {isBookmarked ?
                            <i className="fas fa-bookmark" onClick={handleRemoveFromBookmarkedVideos}></i>
                            :
                            <i className="far fa-bookmark" onClick={handleAddToBookmarkedVideos}></i>
                        }
                        
                        <i className="fas fa-clipboard-list" onClick={() => setShow(true)}></i>
                    </div>
                </div>
            </div>
            <PlaylistModal onClick={() => setShow(false)} show={show} videoDetails={videoDetails} title="Save to...">
                {userplaylists}
            </PlaylistModal>

        </div >
    )
}

export default Video;