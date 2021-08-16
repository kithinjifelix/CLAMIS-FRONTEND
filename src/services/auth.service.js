import axios from 'axios';
import config from "../config";

class AuthService {
    login(username, password) {
        return axios
            .post(`${config.backendURI}/users/signin`, { username, password })
            .then((response) => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }
}

export default new AuthService();
