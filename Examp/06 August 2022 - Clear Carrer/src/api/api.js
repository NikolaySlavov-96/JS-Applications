import { getSession } from "../utility.js";

const host = 'http://localhost:3030';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    if (data !== null) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = getSession();
    if (user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    try {
        const response = await fetch(host + url, options);

        if(response.status == 204) {
            return response
        }

        const data = await response.json();

        if(response.ok == false) {
            throw new Error(data.message)
        }

        return data;

    } catch (err) {
        alert(err.message);
        throw err;
    }
}

export const getRequest = request.bind(null, 'get');
export const postRequest = request.bind(null, 'post');
export const putRequest = request.bind(null, 'put');
export const deleteRequest = request.bind(null, 'delete');