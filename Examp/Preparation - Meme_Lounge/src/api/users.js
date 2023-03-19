import * as api from './api.js';
import { setSession, removeSession } from '../utility/utility.js';

const endpoints = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout'
}

export async function login(email, password) {
    const dataLogin = await api.postRequest(endpoints.login, { email, password });
    console.log(dataLogin);
    const userData = {
        username: dataLogin.username,
        email : dataLogin.email,
        id: dataLogin._id,
        accessToken: dataLogin.accessToken
    }

    setSession(userData);
}

export async function register(username, email, password, gender) {
    const dataRegister = await api.postRequest(endpoints.register, { username, email, password, gender });

    const userData = {
        username: dataRegister.username,
        email : dataRegister.email,
        id: dataRegister._id,
        accessToken: dataRegister.accessToken
    }

    setSession(userData);
}

export async function logout() {
    const dataLogout = await api.getRequest(endpoints.logout);
    removeSession();
    return dataLogout;
}