import axiosClient from "services/axiosClient";
import USER_API from "./url";

class UserService {
    userRegister(body) {
        const url = USER_API.USER_REGISTER_URL;
        return axiosClient.post(url, body);
    }

    userLogin(body) {
        const url = USER_API.USER_LOGIN_URL;
        return axiosClient.post(url, body);
    }
}

export default new UserService();
