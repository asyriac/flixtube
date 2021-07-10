import { useEffect } from "react";
import { useAuthContext } from "../contexts/auth-context";

const useFetchCurrentUser = () => {
  const { initialLoading, fetchCurrentUser } = useAuthContext();

  useEffect(() => {
    if (initialLoading) fetchCurrentUser();
  }, [initialLoading, fetchCurrentUser]);
};

export default useFetchCurrentUser;
