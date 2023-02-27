import * as api from './api.js';


const endPoints = {
    'create': 'data/catalog',
    'get': 'data/catalog/',
    'allFurniture': 'data/catalog',
    'detailsUD': 'data/catalog/',
    'my-furniture': (userId) => `data/catalog?where=_ownerId%3D%22${userId}%22`
}
// My Furniture (GET): http://localhost:3030/data/catalog?where=_ownerId%3D%22{userId}%22;

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