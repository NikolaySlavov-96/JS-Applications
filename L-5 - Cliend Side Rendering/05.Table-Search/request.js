const host = 'http://localhost:3030';

const endPoints = {
    'getAllUser': '/jsonstore/advanced/table',
}

async function request() {

    try {
        const response = await fetch(host + endPoints.getAllUser, {
            method: 'get'
        });

        if(response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        if(response.status == 204) {
            return response;
        }

        return await response.json();

    } catch(err) {
        alert(err.message);
        throw err;
    }
}

export async function allDetail() {
    return request()
}