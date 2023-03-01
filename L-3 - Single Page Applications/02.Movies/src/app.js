import { showHome } from './views/homeView.js';
import { showAddMovie } from './views/addMovie.js';
import { showEdit } from './views/editMovie.js';
import { showLogin } from './views/loginView.js';
import { showRegister } from './views/registerView.js';
import { showMovie } from './views/movieExample.js';
import { checkUserNav, editViewFielt } from './untils.js';
import { logoutPanel } from './views/logout.js';

import { renderDom, addMovieToDom, movieDetails } from './dom.js';

document.querySelector('nav').addEventListener('click', onNavigation)

const sections = {
    'homeView': showHome,
    'loginView': showLogin,
    'registerView': showRegister,
    'logoutView': logoutPanel,
    'addMovieView': showAddMovie,
    'movie-example': showMovie,
    'editView': showEdit,
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

function goTo(viewName, dataMovie) {
    const screen = sections[viewName];

    if(typeof screen == 'function') {
        screen({
            goTo,
            checkUserNav,
            renderDom,
            addMovieToDom,
            movieDetails,
            editViewFielt
        }, dataMovie)
        return true;
    }
    return false;
}