import * as api from './api.js';


const endPoints = {
    'create': 'data/catalog',
    'allFurniture': 'data/catalog',
    'detailsUD': 'data/catalog/',
}
// My Furniture (GET): http://localhost:3030/data/catalog?where=_ownerId%3D%22{userId}%22;

export async function getAllFurniture() {
    return await api.getRequest(endPoints.create)
}

export async function getDatails(id) {
    return await api.getRequest(endPoints.create + id)
}

export async function createFurniture(data) {
    return await api.postRequest(endPoints.create, data)
}

