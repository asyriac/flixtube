import { useEffect } from "react";
import { useAuthContext } from "../contexts/auth-context";
import { usePlaylistContext } from "../contexts/playlist-context";

const useFetchUserPlaylists = () => {
  const { isLoggedIn } = useAuthContext();
  const { getUserPlaylist } = usePlaylistContext();

  useEffect(() => {
    if (isLoggedIn) getUserPlaylist();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
};

export default useFetchUserPlaylists;
