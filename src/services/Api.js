import axios from "axios";
import config from "../config";
import authHeader from './auth-header';

export const getAll = async (endpoint, params) => {
    let request = axios.get(`${config.backendURI}/${endpoint}`, { headers: authHeader() });
    if (params) {
        request = axios.get(`${config.backendURI}/${endpoint}`, { params: params, headers: authHeader() });
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
        data: data,
        headers: authHeader()
    });

    try {
        const response = await request;
        return { status: 200, data: response.data};
    } catch (e) {
        return { status: 400, data: e.response.data};
    }
};

export const put = async (endpoint, data) => {
    let request = axios({
        method: 'put',
        url: `${config.backendURI}/${endpoint}`,
        data: data,
        headers: authHeader()
    });

    try {
        const response = await request;
        return response.data;
    } catch (e) {
        console.log(e);
    }
    return [];
};

export const deleteItem = async (endpoint) => {
    let request = axios({
        method: 'delete',
        url: `${config.backendURI}/${endpoint}`,
        headers: authHeader()
    });
    
    try {
        const response = await request;
        return response.data;
    } catch (e) {
        console.log(e);
    }
}
