const initialState = {
    videos: [],
    loading: false
}

const videoReducer = (state,{type,payload}) => {
    switch(type){
        case "GET_VIDEOS":     
            return {
                ...state,
                videos: payload,
                loading: false
            }
        case "LOADING":
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}

export {initialState, videoReducer};