import { useNavigate } from 'react-router';
import { usePlaylistContext } from '../../contexts/playlist-context';
import placeholder from '../../images/placeholder.png'

const Playlist = () => {

    const {liked, bookmarked, userplaylists} = usePlaylistContext();
    const navigate = useNavigate();

    return(
        <>
        <div className="card-list row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 pt-1">          
            <div className="card" onClick={()=> navigate(`/playlists/liked/${liked.videos[0]?.url}`)}>
                <img src={liked.videos.length>0 ? liked.videos[0].thumbnail: placeholder} />
                <div className="card-content">
                    <h3>Liked videos</h3>
                </div>
            </div>
            <div className="card" onClick={()=> navigate(`/playlists/bookmarked/${bookmarked.videos[0].url}`)}>
                <img src={bookmarked.videos.length>0 ? bookmarked.videos[0].thumbnail: placeholder} />
                <div className="card-content">
                    <h3>Bookmarked videos</h3>
                </div>
            </div>
        </div>

        <hr />
        <h2>My Playlists</h2>
        <div className="card-list row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 pt-1">          
            {
                userplaylists.map((playlist)=>{
                    return (
                        <div className="card" onClick={()=> navigate(`/playlists/${playlist.id}/${playlist.videos[0].url}`)}>
                            <img src={playlist.videos.length>0 ? playlist.videos[0].thumbnail: placeholder} />
                            <div className="card-content">
                                <h3>{playlist.title}</h3>
                            </div>
                        </div>
                    )
                })
            }
        </div>
        
    </>
    )
}

export default Playlist;