import axios from "axios";
import queryString from "query-string";
import { LOCAL_STORAGE } from "constants/global";

// Set up default config for http requests here
// Please have a look at here `https://github.com/axios/axios#request-config` for the full list of configs
const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    // withCredentials: false,
    // headers: {
    //     "content-type": "application/json",
    //     "Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    // },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const newConfig = { ...config };
    const token = localStorage.getItem("accessToken") ?? "";
    if (token) {
        newConfig.headers.Authorization = `Bearer ${token}`;
    }

    return newConfig;
});

axiosClient.interceptors.response.use(
    (response) => {
        console.log(response);
        if (response && response.data) {
            return response.data;
        }

        return response;
    },
    (error) => {
        console.log(error);
        if (error.response.status === 401) {
            console.log("fail 401 loging out...");

            localStorage.removeItem(LOCAL_STORAGE.ACCESS_TOKEN);
            window.location.reload();
        }
        throw error;
    }
);

export default axiosClient;
