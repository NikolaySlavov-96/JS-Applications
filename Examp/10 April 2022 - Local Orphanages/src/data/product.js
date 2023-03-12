import * as api from './api.js';

const endpoint = {
    'catalogProducts': '/data/posts?sortBy=_createdOn%20desc',
    'createProduct': '/data/posts',
    'detailCRUD': '/data/posts/',
    'myPosts': (userId) => `/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
}

export function getAllProducts() {
    return api.getRequest(endpoint.catalogProducts);
}

export function createElement(data) {
    return api.postRequest(endpoint.createProduct, data);
}

export function getDetailForElement(id) {
    return api.getRequest(endpoint.detailCRUD + id);
}

export function editDetailForElement(id, data) {
    return api.putRequest(endpoint.detailCRUD + id, data);
}

export function deleteElement(id) {
    return api.delleteRequest(endpoint.detailCRUD + id);
}

export function getAllMyPosts(userId) {
    return api.getRequest(endpoint.myPosts(userId));
}