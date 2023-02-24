const host = 'http://localhost:3030';

async function request(method, url, data) {
    const option = {
        method,
        headers: {},
    }

    if(data) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data);
    }

    try {
        const resposne = await fetch(host + url, option);

        if(resposne.ok == false) {
            const error = await resposne.json();
            throw new Error(error.message);
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

export function getRequest(url) {
    return request('get', url);
}

export function postRequest(url, data) {
    return request('post', url, data)
}