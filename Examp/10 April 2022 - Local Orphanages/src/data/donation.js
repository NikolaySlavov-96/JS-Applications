import * as api from './api.js';

const endpoints = {
    'addDonation': '/data/donations',
    'getSpecificDonation': (postId) => `/data/donations?where=postId%3D%22${postId}%22&distinct=_ownerId&count`,
    'isDonation': (postId, userId) => `/data/donations?where=postId%3D%22${postId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export function createDonation(data) {
    return api.postRequest(endpoints.addDonation, {postId: data});
}

export function getAllDonation(postId) {
    return api.getRequest(endpoints.getSpecificDonation(postId));
}

export function isDonationUser(postId, userId) {
    return api.getRequest(endpoints.isDonation(postId, userId));
}