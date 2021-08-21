import axios from "axios";
import { CONFIG } from "../config/constant";

export const getAll = async (endpoint, params) => {
    let request = axios.get(`${CONFIG.backendURI}/${endpoint}`);
    if (params) {
        request = axios.get(`${CONFIG.backendURI}/${endpoint}`, { params: params });
    }
    
    try {
        const response = await request;
        return { status: 200, data: response.data };
    } catch (e) {
        return { status: 400, data: e.response.data};
    }
}

export const post = async (endpoint, data) => {
    let request = axios({
        method: 'post',
        url: `${CONFIG.backendURI}/${endpoint}`,
        data: data
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
        url: `${CONFIG.backendURI}/${endpoint}`,
        data: data
    });

    try {
        const response = await request;
        return { status: 200, data: response.data};
    } catch (e) {
        return { status: 400, data: e.response.data};
    }
};

export const deleteItem = async (endpoint) => {
    let request = axios({
        method: 'delete',
        url: `${CONFIG.backendURI}/${endpoint}`
    });
    
    try {
        const response = await request;
        return { status: 200, data: response.data};
    } catch (e) {
        return { status: 400, data: e.response.data};
    }
}
