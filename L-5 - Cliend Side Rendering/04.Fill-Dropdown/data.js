import { getRequest, postRequest } from './reguest.js';

const endpoints = {
    'getOrPost': '/jsonstore/advanced/dropdown'
}

export async function getElement() {
    return getRequest(endpoints.getOrPost);
}

export async function postElement(data) {
    return postRequest(endpoints.getOrPost, {text: data});
}