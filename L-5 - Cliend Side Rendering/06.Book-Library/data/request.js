const host = 'http://localhost:3030/';

async function request(method, url, data) {
    const option = {
        method,
        headers: {}
    }

    if(data) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }

    try {
        const resposen = await fetch(host + url, option);
    
        if(resposen.ok == false) {
            const error = await resposen.json();
            throw new Error(error.message);
        }
    
        if(resposen.status == 204) {
            return resposen
        }
    
        return await resposen.json();

    } catch(err) {
        alert(err.message);
        throw err;
    }
}

export function getRequest(url) {
    return request('get', url);
}

export function postRequest(url, data) {
    return request('post', url, data)
}

export function putRequest(url, data) {
    return request('put', url, data)
}