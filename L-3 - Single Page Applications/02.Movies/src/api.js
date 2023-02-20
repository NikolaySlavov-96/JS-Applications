const host = 'http://localhost:3030';

async function request(method, url, data) {
    const option = {
        method,
        headers: {},
    }
    
    if(data !== undefined) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if(userData !== null) {
        option.headers['X-Authorization'] = userData.accessToken;
    }
    try {
        const respost = await fetch(host + url, option);

        if(respost.ok == false) {
            const error = await respost.json();
            throw new Error(error.message);
        }

        if(respost.status == 204) {
            return respost
        }
        return await respost.json();

    } catch(err) {
        alert(err.message);
        throw err;
    }
}

export function getRequest(url) {
    return request('get', url);
}

export function postRequest(url, data) {
    return request('post', url, data);
}

export function putRequest(url, data) {
    return request('put', url, data);
}

export function dellRequest(url) {
    return request('delete', url);
}