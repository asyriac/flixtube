const PlaylistViewSidebar = () => {

    return (
        <div className="playlist-videos-list">
                {
                    liked.videos.map((item)=>{
                        return (
                            <div className={`playlist-videos-list-item ${item.id === currentVideo.id && 'playlist-item-active'}`} onClick={()=>handlePlaylistVideo(item)}>
                                <img src={item.thumbnail} alt={item.title}/>
                                <h4>{item.title}</h4>
                            </div>
                        )
                    })
                }
        </div>
    )
}

export default PlaylistViewSidebar;