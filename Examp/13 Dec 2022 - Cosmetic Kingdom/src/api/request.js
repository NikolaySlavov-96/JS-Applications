const host = 'http://localhost:3030/';
import { getSessionStorage } from '../until.js'

async function requer(method, url, data) {
    const options = {
        method,
        headers: {}
    }
    if(data !== null) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }
    const user = getSessionStorage();
    
    if(user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    try {
        const response = await fetch(host + url, options);

        if(response.status == 204) {
            return response
        }
        
        const dataResponse = await response.json();
        
        if(response.ok == false) {
            throw new Error(dataResponse.message);
        }

        return dataResponse;

    } catch(err) {
        alert(err.message);
        throw err
    }
}

export function getRequest(url) {
    return requer('get', url);
}

export function postRequest(url, data) {
    return requer('post', url, data);
}

export function putRequest(url, data) {
    return requer('put', url, data);
}

export function dellRequest(url) {
    return requer('delete', url);
}