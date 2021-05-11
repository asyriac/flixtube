export const findPlaylistDetails = (playlistId, playlists) => {
    return playlists.find((item) => item.id === playlistId)
}