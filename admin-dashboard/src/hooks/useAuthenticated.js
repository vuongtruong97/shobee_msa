import { LOCAL_STORAGE } from "constants/global";
import useLocalStorage from "./useLocalStorage";

const useAuthenticated = () => {
    const accessTokenStorage = useLocalStorage(LOCAL_STORAGE.ACCESS_TOKEN);
    const accessToken = accessTokenStorage.getValue();

    return !!accessToken;
};

export default useAuthenticated;
