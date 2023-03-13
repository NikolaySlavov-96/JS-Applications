import * as api from './api.js';

const endpoints = {
    'catalogGet': '/data/games?sortBy=_createdOn%20desc&distinct=category',
    'getAllGame': '/data/games?sortBy=_createdOn%20desc',
    'createGame': '/data/games',
    'getGame': '/data/games/'
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
    return api.getRequest(endpoints.getGame + idGame);
}