import * as api from './api.js';

const endpoints = {
    'getAllJobs': '/data/offers?sortBy=_createdOn%20desc',
    'addOffer' : '/data/offers',
    'getOfferts': '/data/offers/',
    'allAgree': (offerId) => `/data/applications?where=offerId%3D%22${offerId}%22&distinct=_ownerId&count`,
    'getIsSpecific': (offerId, userId) => `/data/applications?where=offerId%3D%22${offerId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
    'addAgree': '/data/applications',
}

export async function getAllOffers() {
    const dataAllOffers = await api.getRequest(endpoints.getAllJobs);
    return dataAllOffers
}

export async function createOffers(data) {
    const dataCreate = await api.postRequest(endpoints.addOffer, data);
    return dataCreate;
}

export async function getOfferst(id) {
    const getOffetst = await api.getRequest(endpoints.getOfferts + id);
    return getOffetst;
}

export async function specificAgree(offerId, userId) {
    const dataSpecific = await api.getRequest(endpoints.getIsSpecific(offerId, userId));
    return dataSpecific;
}

export async function getAllAgreeNumber(idOffect) {
    const countetAgree = await api.getRequest(endpoints.allAgree(idOffect));
    return countetAgree;
}

export async function editOffes(idOffes, data) {
    const resultEdit = await api.putRequest(endpoints.getOfferts + idOffes, data);
    return resultEdit;
}

export async function deleteOffers(idOffect) {
    const dataDelete = await api.deleteRequest(endpoints.getOfferts + idOffect);
    return dataDelete;
}

export async function addAgree(dataAgree) {
    const resultAgree = await api.postRequest(endpoints.addAgree, dataAgree);
    return resultAgree;
}