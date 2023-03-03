const host = 'http://localhost:3030/';
import { getUserData } from '../until.js';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    }
    
    if(data !== null) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    const user = getUserData();
    if(user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    try {
        const response = await fetch(host + url, options);

        if(response.status == 204) {
            return response;
        }

        const dataResp = await response.json();

        if(response.ok == false) {
            throw new Error(dataResp.message); //.message
        }

        return dataResp;

    } catch(err) {
        alert(err.message);
        throw err;
    }
}

export function getRequest(url) {
    return request('get', url)
}

export function postRequest(url, data) {
    return request('post', url, data)
}

export function putRequest(url, data) {
    return request('put', url, data)
}

export function dellRequest(url) {
    return request('delete', url)
}