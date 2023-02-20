import * as api from './api.js';
import { showHome } from './views/homeView.js';
import { showAddMovie } from './views/addMovie.js';
import {} from './views/editMovie.js';
import { showLogin } from './views/loginView.js';
import { showRegister } from './views/registerView.js';
import {} from './views/movieExample.js';
import { checkUserNav } from './untils.js';
import { logoutPanel } from './views/logout.js';
import { renderDom } from './dom.js';

document.querySelector('nav').addEventListener('click', onNavigation)

const sections = {
    'homeView': showHome,
    'loginView': showLogin,
    'registerView': showRegister,
    'logoutView': logoutPanel,
    'addMovieView': showAddMovie,
}

goTo('homeView');
checkUserNav();

function onNavigation(ev) {
    if(ev.target.tagName == 'A') {
        const viewName = ev.target.id;
        if(goTo(viewName)) {
            ev.preventDefault();
        }
    }
}

function goTo(viewName) {
    const screen = sections[viewName];

    if(typeof screen == 'function') {
        screen({
            goTo,
            checkUserNav,
            renderDom,
        })
        return true;
    }
    return false;
}