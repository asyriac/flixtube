import ReactPlayer from "react-player";
import { useNavigate, useParams } from "react-router";
import { usePlaylistContext } from "../../contexts/playlist-context";


const LikedVideosView = () => {

    const {videoId} = useParams();
    const {liked, bookmarked, addToLikedVideos, removeFromLikedVideos,removeFromBookmarkedVideos, addToBookmarkedVideos} = usePlaylistContext();

    const currentVideo = liked.videos.find((item)=> item.url === videoId)
    const videoIndex = liked.videos.findIndex((item)=> item.url === videoId)
    const isLiked = liked.videos.find((item)=> item.url === videoId)
    const isBookmarked = bookmarked.videos.find((item)=> item.url === videoId)

    const navigate = useNavigate();

    const handlePlaylistVideo = (item) => {
        navigate(`/playlists/liked/${item.url}`)
    }

    const handleRemoveFromLikedVideos = () => {
        removeFromLikedVideos(currentVideo);
        if(liked.videos.length === 1) navigate('/playlists')
        else{
            if(videoIndex===0) navigate(`/playlists/liked/${liked.videos[1].url}`)
            else navigate(`/playlists/liked/${liked.videos[0].url}`)
        }
        
    }

    const handleAddToLikedVideos = () => {
        addToLikedVideos(currentVideo);
    }

    const handleRemoveFromBookmarkedVideos = () => {
        removeFromBookmarkedVideos(currentVideo);        
    }

    const handleAddToBookmarkedVideos = () => {
        addToBookmarkedVideos(currentVideo);
    }

    return(
        <div className="video-notes-container pt-1">
          <div className="playlist-video">
                <div className="video-player">
                    <ReactPlayer
                        width="100%"
                        height="100%"
                        controls
                        url={`https://www.youtube.com/watch?v=${videoId}`}
                    />
                </div>

                <div className="video-details">
                    <h1>{currentVideo?.title}</h1>
                    <div className="video-details-icons">
                        {isLiked ?
                            <i class="fas fa-thumbs-up" onClick={handleRemoveFromLikedVideos}></i>
                            :
                            <i className="far fa-thumbs-up" onClick={handleAddToLikedVideos}></i>
                        }
                        {isBookmarked ?
                            <i class="fas fa-bookmark" onClick={handleRemoveFromBookmarkedVideos}></i>
                            :
                            <i className="far fa-bookmark" onClick={handleAddToBookmarkedVideos}></i>
                        }
                        <i className="fas fa-clipboard-list"></i>
                    </div>
                </div>
            </div>
            <div className="playlist-videos-list">
                {
                    liked.videos.map((item)=>{
                        return (
                            <div className={`playlist-videos-list-item ${item.id === currentVideo.id && 'playlist-item-active'}`} onClick={()=>handlePlaylistVideo(item)}>
                                <img src={item.thumbnail} />
                                <h4>{item.title}</h4>
                            </div>
                        )
                    })
                }
            </div>
        </div >
    )
}

export default LikedVideosView;