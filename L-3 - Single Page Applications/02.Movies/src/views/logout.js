import { getRequest } from '../api.js';
import { endPoints } from '../untils.js';

let ctx = null;

export function logoutPanel(inCtx) {
    ctx = inCtx;

    getRequest(endPoints.logout);
    sessionStorage.removeItem('userData');
    ctx.checkUserNav();
    ctx.goTo('loginView');
}