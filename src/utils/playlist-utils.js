export const findPlaylistDetails = (playlistId, playlists) => {
  return playlists.find((item) => item._id === playlistId);
};
