import * as api from './request.js';
import { setSessionStorage, removeSessionStorage } from '../until.js';

const endpoints = {
    'register': 'users/register',
    'login': 'users/login',
    'logout': 'users/logout'
}

export async function register(email, password) {
    const data = await api.postRequest(endpoints.register, { email, password });
    const userData = {
        email: data.email,
        id: data._id,
        accessToken: data.accessToken
    }
    setSessionStorage(userData);
    return data
}
export async function login(email, password) {
    const data = await api.postRequest(endpoints.login, { email, password });
    const userData = {
        email: data.email,
        id: data._id,
        accessToken: data.accessToken
    }
    setSessionStorage(userData);
    return data
}

export async function logout() {
    const data = await api.getRequest(endpoints.logout);
    removeSessionStorage()
    return data;
}
