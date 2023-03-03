import { setUserData } from '../until.js';
import * as api from './api.js';


const endPoints = {
    'register': 'users/register',
    'login': 'users/login',
    'logout': 'users/logout'
}

export async function register(email, password) {
    const data = await api.postRequest(endPoints.register, {email, password});
    const userData = {
        id: data._id,
        email: data.email,
        accessToken: data.accessToken
    }
    setUserData(userData);
    return data
}

export async function login(email, password) {
    const data = await api.postRequest(endPoints.login, {email, password});
    const userData = {
        id: data._id,
        email: data.email,
        accessToken: data.accessToken
    }
    setUserData(userData)
    return data;
}

export function logout() {
    return api.getRequest(endPoints.logout);
}