import {} from './view/shareView.js';
import { registerSection } from './view/registerView.js';
import {} from './view/loginView.js';
import { homeSection } from './view/homeView.js';
import {} from './view/detailsView.js';
import {} from './view/dashbord.js';
import { renderDom, checkUserNav } from './until.js';
import {} from './api.js';

document.querySelector('nav').addEventListener('click', onNavigation);

const views = {
    '/': homeSection,
    '/register': registerSection,
}

goTo('homeView');
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
        });
        return true;
    }
    return false;
}

