import axios from 'axios';
//创建instance实例
let request = axios.create({
    baseURL: 'http://localhost:8080',
    timeout: 10000
});
//请求拦截
request.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);
//响应拦截
request.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        return Promise.reject(error);
    }
);
export default request;