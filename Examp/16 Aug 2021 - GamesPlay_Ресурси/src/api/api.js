import { getSessiong } from "../utility/utility.js";

const host = 'http://localhost:3030';

async function requred(method, url, data) {
    const options = {
        method,
        headers: {}
    }

    if(data !== null) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = getSessiong();
    if(user) {
        options.headers['X-Authorization'] = user.accessToken;
    }

    try {
        const response = await fetch(host + url, options); 

        if(response.status == 204) {
            return response
        }

        const responseData = await response.json();

        if(response.ok == false) {
            throw new Error(responseData.message);
        }

        return responseData;
    
    } catch(err) {
        alert(err.message);
        throw err;
    }
}

export const getRequest = requred.bind(null, 'get');
export const postRequest = requred.bind(null, 'post');
export const putRequest = requred.bind(null, 'put');
export const deleteRequest = requred.bind(null, 'delete');