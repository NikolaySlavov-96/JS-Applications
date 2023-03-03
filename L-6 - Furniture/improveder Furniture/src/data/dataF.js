import * as api from './api.js';

const pageSize = 4; // for pagination

const endPoints = {
    'create': 'data/catalog',
    'get': 'data/catalog/',
    'allFurniture': 'data/catalog',
    'detailsUD': 'data/catalog/',
    'my-furniture': (userId) => `data/catalog?where=_ownerId%3D%22${userId}%22`,
    'getSize': 'data/catalog?count', // get size all product for paginations
    'getFurniture': `data/catalog?pageSize=${pageSize}&offset=`, // pagination not all data
}

export async function getAllFurniture() {
    return await api.getRequest(endPoints.create)
}

export async function getDatails(id) {
    return await api.getRequest(endPoints.get + id)
}

export async function createFurniture(data) {
    return await api.postRequest(endPoints.create, data)
}

export async function getMyFurniture(id) {
    return await api.getRequest(endPoints['my-furniture'](id));
}

export async function putFurniture(id, data) {
    return await api.putRequest(endPoints.detailsUD + id, data);
}

export async function deleteFurniture(id) {
    return await api.dellRequest(endPoints.detailsUD + id);
}

// ---> create for pagination and search <---

export async function getAllFurnitureSearchPage(search, page) {
    let dataUrl = endPoints.getFurniture + (page - 1) * pageSize;
    let sizeUrl = endPoints.getSize;
    if (search !== '') {
        const param = '&where=' + encodeURIComponent(`make LIKE "${search}"`);
        dataUrl += param;
        sizeUrl += param;
    }

    const [data, size] = await Promise.all([
        api.getRequest(dataUrl),
        api.getRequest(sizeUrl)
    ])

    return {
        data,
        pages: Math.ceil(size / pageSize)
    };
}