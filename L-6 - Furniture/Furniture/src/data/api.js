const host = 'http://localhost:3030/';

async function request(method, url, data) {
    const options = {
        method,
        headers: {}
    }
    
    if(data !== null) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    // if(userData) {
    //     // options.headers['X-Authorization'] = // accessToken;
    // }

    try {
        const response = await fetch(host + url, options);

        if(response.status == 204) {
            return response;
        }

        const dataResp = await response.json();

        if(dataResp.ok == false) {
            throw new Error(dataResp); //.message
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