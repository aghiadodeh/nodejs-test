'use strict';
import ObjectHelper from '../common/helpers/ObjectHelper';
import httpService from './HttpService';
const baseUrl = 'https://dummyjson.com';

async function getUsers(query) {
    const { limit, skip } = ObjectHelper.paginationData(query);
    const data = await httpService.get(`${baseUrl}/users?limit=${limit}&skip=${skip}`);
    data.list = data.users;
    delete data.users;
    return data;
}

async function getUser(id) {
    const data = await httpService.get(`${baseUrl}/users/${id}`);
    return data;
}

export default {
    getUsers,
    getUser,
}