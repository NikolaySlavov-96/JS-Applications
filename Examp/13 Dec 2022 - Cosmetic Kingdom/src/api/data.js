import * as api from './request.js';

const endpoints = {
    'getProduct': 'data/products?sortBy=_createdOn%20desc',
    'addProduct': 'data/products',
    'getProcutID': 'data/products/',
    'buyProduct': 'data/bought',
    'getBuyProduct': (productId) => `data/bought?where=productId%3D%22${productId}%22&distinct=_ownerId&count`,
    'getSpecificUser': (productId, userId) => `data/bought?where=productId%3D%22${productId}%22%20and%20_ownerId%3D%22${userId}%22&count`
};

export async function gerProducts() {
    const products = await api.getRequest(endpoints.getProduct);
    return products;
}

export async function addProduct(data) {
    const product = await api.postRequest(endpoints.addProduct, data);
    return product;
}

export async function getSpecificProduct(id) {
    const product = await api.getRequest(endpoints.getProcutID + id);
    return product;
}

export async function editProduct(id, data) {
    const product = await api.putRequest(endpoints.getProcutID + id, data)
    return product;
}

export async function deleteProduct(id) {
    const result = await api.dellRequest(endpoints.getProcutID + id);
    return result;
}

export async function buyProduct(productId) {
    const result = await api.postRequest(endpoints.buyProduct, {productId});
    return result;
}

export async function getProductInfo(id) {
    const result = await api.getRequest(endpoints.getBuyProduct(id));
    return result;
}

export async function getBoughtSpecificUser(productId, userId) {
    const result = await api.getRequest(endpoints.getSpecificUser(productId, userId))
    return result
}