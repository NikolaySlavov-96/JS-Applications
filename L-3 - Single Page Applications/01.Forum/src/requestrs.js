const urlAPI = `http://localhost:3030`;

export async function request(method, url, data) {
    const option = {
        method,
        headers: {}
    };

    if(data !== undefined) {
        option.headers['Content-Type'] = 'application/json';
        option.body = JSON.stringify(data)
    }
    
    try {
        const resposne = await fetch(urlAPI + url, option);

        if(resposne.status !== 200) {
            const error = await resposne.json();
            throw new Error('Err')
        }

        return await resposne.json();

    } catch(err) {
        alert(err.message)
    }
}

export function getRequest(url, data) {
    return request('get', url, data);
}

export function postRequest(url, data) {
    return request('post', url, data)
}