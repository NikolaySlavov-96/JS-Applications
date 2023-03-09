import * as api from './api.js';
import { setSession, removeSession } from '../utility.js';

const endpoints = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout'
}

export async function login(email, password) {
    const dataLogin = await api.postRequest(endpoints.login, { email, password })

    const userData = {
        email: dataLogin.email,
        id: dataLogin._id,
        accessToken: dataLogin.accessToken,
    }

    setSession(userData);
    return dataLogin
}

export async function register(email, password) {
    const dataRegister = await api.postRequest(endpoints.register, { email, password })

    const userData = {
        email: dataRegister.email,
        id: dataRegister._id,
        accessToken: dataRegister.accessToken,
    }

    setSession(userData);
    return dataRegister
}

export async function logout() {
    const dataLogout = await api.getRequest(endpoints.logout)

    removeSession()
    return dataLogout;
}