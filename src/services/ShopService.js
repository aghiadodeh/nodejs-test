'use strict';
import Constants from '../common/config/constants';
import ObjectHelper from '../common/helpers/ObjectHelper';
import httpService from './HttpService';

async function getProducts(query) {
    const { limit, skip } = ObjectHelper.paginationData(query);
    const data = await httpService.get(`${Constants.baseUrl}/products?limit=${limit}&skip=${skip}`);
    data.data = data.products;
    delete data.products;
    return data;
}

async function getBrands() {
    const data = await httpService.get(`${Constants.baseUrl}/products`);
    const products = data.products;
    const brands = ObjectHelper.groupByKey(products, "brand");
    return Object.keys(brands);
}

async function getCategories() {
    const data = await httpService.get(`${Constants.baseUrl}/products/categories`);
    const categories = [
        { id: "all", name: "All" }
    ];
    for (let i = 0; i < data.length; i++) {
        categories.push({ id: data[i], name: data[i] })
    }
    return categories;
}

async function getCategoryProducts(category, query) {
    const { limit, skip } = ObjectHelper.paginationData(query);
    if (category == 'all') {
        return getProducts(query);
    }
    const data = await httpService.get(`${Constants.baseUrl}/products/category/${category}?limit=${limit}&skip=${skip}`);
    data.data = data.products;
    delete data.products;
    return data;
}

export default {
    getBrands,
    getProducts,
    getCategories,
    getCategoryProducts,
}