import * as api from './api.js';

const endpoints = {
    'getAllMeme': '/data/memes?sortBy=_createdOn%20desc',
    'createMeme': '/data/memes',
    'getEditDeleteMeme': '/data/memes/',
    'myMeme': (userId) => `/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`,
}


export function getAllMeme() {
    return api.getRequest(endpoints.getAllMeme);
}

export function createMeme(data) {
    return api.postRequest(endpoints.createMeme, data);
}

export function getMeme(idGame) {
    return api.getRequest(endpoints.getEditDeleteMeme + idGame);
}

export function editMeme(idGame, data) {
    return api.putRequest(endpoints.getEditDeleteMeme + idGame, data);
}

export function deleteMeme(idGame) {
    return api.deleteRequest(endpoints.getEditDeleteMeme + idGame);
}

export function getMyMeme(idMeme) {
    return api.getRequest(endpoints.myMeme(idMeme));
}