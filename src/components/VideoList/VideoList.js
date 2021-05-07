import {  useNavigate } from 'react-router-dom';
import data from '../../data/videos'
import './VideoList.css'

const VideoList = () => {


    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/video/${id}`)
    }

    return (
        <div className="card-list row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 pt-1">
            {
                data.map((item) => {
                    return (
                        <div key={item.id} className="card" onClick={() => handleClick(item.id)}>
                            <img src={item.thumbnail} alt={item.title}/>
                            <div className="card-content">
                                <h3>{item.title}</h3>
                                <div className="flex mt-md">
                                    <img src={item.channelImage} className="img-round" alt={item.channelName}/>
                                    <div>
                                        <span className="ml-sm">{item.channelName}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )

}

export default VideoList;