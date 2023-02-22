import { createSection } from './view/createView.js';
import { registerSection } from './view/registerView.js';
import { loginSection } from './view/loginView.js';
import { homeSection } from './view/homeView.js';
import { detailSection } from './view/detailsView.js';
import { dashbordSection } from './view/dashbord.js';
import { renderDom, checkUserNav } from './until.js';
import { getRequest } from './api.js';
import { endPoints } from './config.js';
import { createDom } from './domCreate.js';

document.querySelector('nav').addEventListener('click', onNavigation);

const views = {
    '/': homeSection,
    '/register': registerSection,
    '/login': loginSection,
    '/dashbord': dashbordSection,
    '/create': createSection,
    '/detailView': detailSection,
    '/logout': sessionLogout,
}

goTo('/');
checkUserNav(); //work;

function onNavigation(ev) {
    ev.preventDefault()
    let event = ev.target;
    if(event.tagName == 'IMG') {
        event = event.parentElement;
    }

    if(event.tagName == 'A') {
        const viewSection = new URL(event.href).pathname;
        if(goTo(viewSection)) {
        }
    }
}

function goTo(viewSection) {
    const view = views[viewSection];
    if(typeof view == 'function') {
        view({
            goTo,
            renderDom,
            checkUserNav,
            createDom,
        });
        return true;
    }
    return false;
}

function sessionLogout() {
    getRequest(endPoints.logout);
    sessionStorage.removeItem('userData');
    checkUserNav();
    goTo('/')
}