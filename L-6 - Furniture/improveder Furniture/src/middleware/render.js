import { render } from '../../node_modules/lit-html/lit-html.js';

export function addRender(nav, main) {
    return function (ctx, next) {
        ctx.renderNav = renderNav;
        ctx.render = renderMain;
        next()
    }

    function renderNav(content) {
        render(content, nav);
    }
    function renderMain(content) {
        render(content, main);
    }
}
