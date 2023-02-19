import { homeViewSection } from './homeView.js';
import { postView, view } from './postView.js';
// import {} from './views.js';

document.querySelector('nav a').addEventListener('click', () => goTo('homeView'));

const section = {
    'homeView': homeViewSection,
    'postView': postView,
}

goTo('homeView');

function render(section) {
    // document.querySelector('main').replaceChildren(section);
    view(section)
}

function goTo(view) {
    const viewPage = section[view];

    if(typeof viewPage === 'function') {
        viewPage({
            goTo,
            render
        })
    }
}