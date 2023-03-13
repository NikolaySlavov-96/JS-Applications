import * as api from './api.js';

const endpoints = {
    'catalogGet': '/data/games?sortBy=_createdOn%20desc&distinct=category',
    'getAllGame': '/data/games?sortBy=_createdOn%20desc',
    'createGame': '/data/games',
    'getEditDeleteGame': '/data/games/',
    'allComments': (gameId) => `/data/comments?where=gameId%3D%22${gameId}%22`,
    'addComment': '/data/comments',
}

export function getHomeGame() {
    return api.getRequest(endpoints.catalogGet);
}

export function getAllGames() {
    return api.getRequest(endpoints.getAllGame);
}

export function createGame(data) {
    return api.postRequest(endpoints.createGame, data);
}

export function getGame(idGame) {
    return api.getRequest(endpoints.getEditDeleteGame + idGame);
}

export function editGame(idGame, data) {
    return api.putRequest(endpoints.getEditDeleteGame + idGame, data);
}

export function deleteGame(idGame) {
    return api.deleteRequest(endpoints.getEditDeleteGame + idGame);
}

export function getAllComents(idGame) {
    return api.getRequest(endpoints.allComments(idGame));
}

export function addComment(data) {
    return api.postRequest(endpoints.addComment, data);
}