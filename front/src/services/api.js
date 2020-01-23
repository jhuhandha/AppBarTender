import axios from 'axios';

export default class BaseHttpService {

    BASE_URL = 'http://localhost:3000';
    _accesToken = null;

    constructor() {
        axios.interceptors.response.use(function (response) {
            return response;
        }, function ({response}) {
            if (response.statusText == "Unauthorized") {
                localStorage.removeItem('accesToken')
                window.location.href = '/';
            } else {
                return Promise.reject(response);
            }
        });
        this._accesToken = this.getToken();
    }

    _getAxiosOptions() {
        const token = this._accesToken ? this._accesToken : this.getToken();
        return {
            headers: {
                Authorization: `${token}`
            },
        }
    }

    saveToken(accesToken) {
        this._accesToken = accesToken;
        localStorage.accesToken = this._accesToken;
    }

    getToken() {
        return localStorage.accesToken ? localStorage.accesToken : null;
    }

    removeToken() {
        this._accesToken = null
        localStorage.removeItem('accesToken')
    }

    getBaseUrl(){
        return this.BASE_URL;
    }

    get(endpoint, options = {}) {
        Object.assign(options, this._getAxiosOptions());
        return axios.get(`${this.BASE_URL}/${endpoint}`, options)
    }

    post(endpoint, data = {}, options = {}) {
        Object.assign(options, this._getAxiosOptions());
        return axios.post(`${this.BASE_URL}/${endpoint}`, data, options)
    }

    patch(endpoint, data = {}, options = {}) {
        Object.assign(options, this._getAxiosOptions());
        return axios.patch(`${this.BASE_URL}/${endpoint}`, data, options)
    }

    put(endpoint, data = {}, options = {}) {
        Object.assign(options, this._getAxiosOptions());
        return axios.put(`${this.BASE_URL}/${endpoint}`, data, options)
    }

    delete(endpoint, options = {}) {
        Object.assign(options, this._getAxiosOptions());
        return axios.delete(`${this.BASE_URL}/${endpoint}`, options)
    }

}