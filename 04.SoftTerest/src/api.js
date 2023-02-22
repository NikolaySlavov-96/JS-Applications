const host = 'http://localhost:3030';
import { checkSessionStorage } from './until.js';

async function request(method, url, data) {
    const options = {
        method,
        headers: {},
    }

    if(data !== undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = checkSessionStorage();
    if(userData !== null) {
        options.headers['X-Authorization'] = userData.accessToken;
    }

    try {
        const resposne = await fetch(host + url, options);

        if(resposne.ok == false) {
            const error = await resposne.json();
            throw new Error(error.message)
        }
        if(resposne.status == 204) {
            return resposne;
        }

        return await resposne.json();

    } catch(err) {
        alert(err.message);
        throw err;
    }
}

export const getRequest = request.bind(null, 'get');
export const postRequest = request.bind(null, 'post');
export const putRequest = request.bind(null, 'put');
export const dellRequest = request.bind(null, 'Delete');