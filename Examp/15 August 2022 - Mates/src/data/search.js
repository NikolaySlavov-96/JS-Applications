import * as api from './api.js';

const endPoints = {
    'search': (query) => `/data/shoes?where=brand%20LIKE%20%22${query}%22`
}

export async function searchEngine(query) {
    const resultRequest = await api.getRequest(endPoints.search(query));
    return resultRequest;
}