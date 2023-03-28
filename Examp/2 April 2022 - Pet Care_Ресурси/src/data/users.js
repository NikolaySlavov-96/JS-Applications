import * as api from './api.js';
import { removeSession, setSessiont } from '../utility.js';

const endpoint = {
    'login': '/users/login',
    'register': '/users/register',
    'logout': '/users/logout'
}

export async function register(email, password) {
    const dataRegister = await api.postRequest(endpoint.register, { email, password });

    const dataUser = {
        email: dataRegister.email,
        id: dataRegister._id,
        accessToken: dataRegister.accessToken
    }
    setSessiont(dataUser);
    return dataRegister;
}

export async function login(email, password) {
    const dataLogin = await api.postRequest(endpoint.login, { email, password });

    const dataUser = {
        email: dataLogin.email,
        id: dataLogin._id,
        accessToken: dataLogin.accessToken
    }
    setSessiont(dataUser);
    return dataLogin;
}

export async function logout() {
    const logout = await api.getRequest(endpoint.logout);
    removeSession();
    return logout;
}