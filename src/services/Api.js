import axios from "axios";
import config from "../config";

export const getAll = async (endpoint, params) => {
    let request = axios.get(`${config.backendURI}/${endpoint}`);
    if (params) {
        request = axios.get(`${config.backendURI}/${endpoint}`, { params: params });
    }
    
    try {
        const response = await request;
        return response.data;
    } catch (e) {
        console.log(e);
    }
    return [];
}

export const post = async (endpoint, data) => {
    let request = axios({
        method: 'post',
        url: `${config.backendURI}/${endpoint}`,
        data: data
    });

    try {
        const response = await request;
        return response.data;
    } catch (e) {
        console.log(e);
    }
    return [];
}
