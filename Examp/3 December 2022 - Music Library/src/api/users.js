import { setSession, removeSession } from '../until.js';
import * as api from './api.js';

const endpoints = {
    'login': 'users/login',
    'register': 'users/register',
    'logout': 'users/logout',
}

export async function login(email, password) {
    const data = await api.postRequest(endpoints.login, {email,password});
    const userData = {
        email: data.email,
        id: data._id,
        accessToken: data.accessToken
    }
    setSession(userData);
    return data;
}

export async function register(email, password) {
    const data = await api.postRequest(endpoints.register, {email,password});
    const userData = {
        email: data.email,
        id: data._id,
        accessToken: data.accessToken
    }
    setSession(userData);
    return data;
}

export async function logout() {
    const data = await api.getRequest(endpoints.logout);
    removeSession();
    return data;
}