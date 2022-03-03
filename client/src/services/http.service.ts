import axios from 'axios';

const axiosWithDefaultOptions = (options: any) => {
    const token = localStorage.getItem('token') || ''
    const defaultOptions = {
        baseURL: process.env.REACT_APP_BACKEND_URL,
        headers: {
            'Authorization': 'bearer ' + token
        }
    };
    return axios.create({ ...defaultOptions, ...options });
};

const errorCb = (error: any) => {
    throw error.response?.data
}

const get = (endpoint: string, options = {}) =>
    axiosWithDefaultOptions(options).get(endpoint).catch(errorCb);

const post = (endpoint: string, data: any, options = {}) =>
    axiosWithDefaultOptions(options)
        .post(endpoint, data).catch(errorCb)

const patch = (endpoint: string, data: any, options = {}) =>
    axiosWithDefaultOptions(options).patch(endpoint, data).catch(errorCb)


const httpService = {
    get,
    post,
    patch,
};

export default httpService;
