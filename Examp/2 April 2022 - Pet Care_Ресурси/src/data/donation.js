import * as api from './api.js';

const endpoints = {
    'addDonation': '/data/donation',
    'getSpecificDonation': (petId) => `/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`,
    'isDonation': (petId, userId) => `/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
};

export function createDonation(data) {
    return api.postRequest(endpoints.addDonation, {petId: data});
}

export function getAllDonation(postId) {
    return api.getRequest(endpoints.getSpecificDonation(postId));
}

export function isDonationUser(postId, userId) {
    return api.getRequest(endpoints.isDonation(postId, userId));
}