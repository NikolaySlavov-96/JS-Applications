const host = 'http://localhost:3030/';

import { getSession } from "../until.js";

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    if(data !== null) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    const user = getSession()
    if(user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    try {
        const response = await fetch(host + url, options);

        if(response.status == 204) {
            return response;
        }

        const dataRes = response.json();

        if(response.ok == false) {
            throw new Error(dataRes.message);
        }

        return dataRes;

    } catch(err) {
        alert(err.message);
        throw err;
    }
}

export const getRequest = request.bind(null, 'get');
export const postRequest = request.bind(null, 'post');
export const putRequest = request.bind(null, 'put');
export const dellRequest = request.bind(null, 'delete');