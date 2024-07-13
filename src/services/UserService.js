'use strict';
import Constants from '../common/config/constants';
import ObjectHelper from '../common/helpers/ObjectHelper';
import httpService from './HttpService';

async function getUsers(query) {
    const { limit, skip } = ObjectHelper.paginationData(query);
    const data = await httpService.get(`${Constants.baseUrl}/users?limit=${limit}&skip=${skip}`);
    data.data = data.users;
    delete data.users;
    return data;
}

async function getUser(id) {
    const data = await httpService.get(`${Constants.baseUrl}/users/${id}`);
    return data;
}

export default {
    getUsers,
    getUser,
}