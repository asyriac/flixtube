import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router";
import data from '../../data/videos'
import './Video.css'

const Video = () => {
    const { videoId } = useParams();
    const videoDetails = data.find((item) => item.id === videoId)

    console.log(videoId)


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
                        <i class="far fa-thumbs-up"></i>
                        <i class="far fa-bookmark"></i>
                        <i class="fas fa-clipboard-list"></i>
                    </div>
                </div>
            </div>

        </div >
    )
}

export default Video;