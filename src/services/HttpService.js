'use strict';
import axios from "axios";
const headers = { "Accept-Encoding": "gzip,deflate,compress" };
export default {
    get: async (url, config = { headers }) => {
        return new Promise(async (resolve, reject) => {
            axios.get(url, config).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(`${url}, error: ${error}`);
                reject(error);
            });
        });
    },
    post: async (url, data = {}, config = {}) => {
        return new Promise(async (resolve, reject) => {
            axios.post(url, data, config).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(error.response);
                reject(error);
            });
        });
    },
    patch: async (url, data = {}, config = {}) => {
        return new Promise(async (resolve, reject) => {
            axios.patch(url, data, config).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(error.response);
                reject(error);
            });
        });
    },
    delete: async (url, config = { headers }) => {
        return new Promise(async (resolve, reject) => {
            axios.delete(url, config).then(response => {
                resolve(response.data);
            }).catch(error => {
                console.log(`${url}, error: ${error}`);
                reject(error);
            });
        });
    },
}