import { render } from '../../node_modules/lit-html/lit-html.js';

export function addRender(nav, section) {
    return function(ctx, next) {
        ctx.renderNav = newRenderNav;
        ctx.render = newRenderSection;
        next();
    }

    function newRenderNav(content) {
        render(content, nav);
    }

    function newRenderSection(content) {
        render(content, section);
    }
}