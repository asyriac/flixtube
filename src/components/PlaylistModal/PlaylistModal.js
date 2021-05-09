import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { usePlaylistContext } from "../../contexts/playlist-context";

const PlaylistModal = (props) => {
    const [newPlaylistTitle, setNewPlaylistTitle] = useState("");
    const [showAddNewPlaylist, setShowAddNewPlaylist] = useState(false);
    const {addNewPlaylist, addToPlaylist} = usePlaylistContext();

    const { onClick, videoDetails , children: playlists} = props;

    useEffect(() => {
        const close = (e) => {
            if (e.keyCode === 27) {
                onClick()
            }
        }
        document.body.addEventListener('keydown', close)
        return () => document.body.removeEventListener('keydown', close)
    }, [onClick])

    const isPresentInPlaylist = (videoId, videos) => {
        if(videos.find(item => item.id === videoId)) return true;
        return false;
    }

    const handleAddNewPlaylist = () => {
        setNewPlaylistTitle("");
        setShowAddNewPlaylist(false);
        addNewPlaylist(newPlaylistTitle);
    }

    const handleAddToPlaylist = (videoDetails, playlistId) => {
        toast.dark('Added to playlist.')
        addToPlaylist(videoDetails, playlistId);
    }


    return (
        <div className={`modal ${props.show ? 'show' : ''}`} onClick={props.onClick}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h4 className="modal-title">{props.title}</h4>
                    <div onClick={props.onClick}>
                        <i className="fas fa-times clickable" ></i>
                    </div>
                </div>
                <div className="modal-body">
                    {props.children.map((item, id) => {
                        return (
                            <div
                                key={id}
                                className="checkbox">
                                <label htmlFor={`checkBox${id}`}>
                                    <input
                                        type="checkbox"
                                        name="checkbox"
                                        id={`checkBox${id}`}
                                        checked= {isPresentInPlaylist(videoDetails.id,item.videos)}
                                        onChange={()=>handleAddToPlaylist(videoDetails,item.id)}
                                    />
                                    {item.title}
                                </label>
                            </div>
                        )
                    })}
                </div>
                <div className="modal-footer">
                    {
                        !showAddNewPlaylist &&
                        <div className="modal-footer-buttons">
                            <button className="btn btn-secondary btn-sm mr-sm" onClick={() => setShowAddNewPlaylist(true)}>New playlist</button>
                        </div>
                    }
                    {showAddNewPlaylist &&
                        <form onSubmit={(e) => e.preventDefault()} className="modal-form">
                            <input
                                value={newPlaylistTitle}
                                onChange={(e) => setNewPlaylistTitle(e.target.value)}
                                type="text"
                                placeholder="New playlist.."
                            />
                            <button className="btn btn-primary btn-danger btn-sm mr-sm ml-sm" type="button" onClick={() => setShowAddNewPlaylist(false)}>Cancel</button>
                            <button className="btn btn-secondary btn-sm" type="button" onClick={handleAddNewPlaylist}>Add</button>
                        </form>
                    }
                </div>

            </div>
        </div >
    );
}

export default PlaylistModal;