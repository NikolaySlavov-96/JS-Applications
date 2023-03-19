import { render } from '../lib.js';

export function renderPage(nav, main) {
    return function(ctx, next) {
        ctx.renderNav = renderNav;
        ctx.renderMain = renderMain;
        next();
    }
    
    function wrapper(contentNav, contentMain) {
        const content = contentNav.bind(contentMain);
        render(content, main);
    }

    function renderNav(content) {
        render(content, nav);
    }

    function renderMain(content) {
        render(content, main);
    }
}