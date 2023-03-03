import * as api from './api.js';

const endpoints = {
    byCarId: (carId) => 'data/comments?where=' + encodeURIComponent(`productId="${carId}"`) + '&load=' + encodeURIComponent('author=_ownerId:users'),
    create: 'data/comments'
}

export function getCommentsById(id) {
    return api.getRequest(endpoints.byCarId(id));
}

export function createCommentForProduct(productId, content) {
    const comment = {
        productId, 
        content
    }
    
    return api.postRequest(endpoints.create, comment); 
}