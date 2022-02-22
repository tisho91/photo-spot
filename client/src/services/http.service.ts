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

const get = (endpoint: string, options = {}) =>
    axiosWithDefaultOptions(options).get(endpoint);

const post = (endpoint: string, data: any, options = {}) =>
    axiosWithDefaultOptions(options).post(endpoint, data)

const patch = (endpoint: string, data: any, options = {}) =>
    axiosWithDefaultOptions(options).patch(endpoint, data)


const httpService = {
    get,
    post,
    patch,
};

export default httpService;
