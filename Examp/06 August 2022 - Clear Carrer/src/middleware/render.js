import { render } from "../lib.js";

export function createRender(nav, main) {
    return function(ctx, next) {
        ctx.renderNav = renderNav;
        ctx.renderSection = renderSection;

        next();
    }

    function renderNav(content) {
        render(content, nav)
    } 

    function renderSection(content) {
        render(content, main);
    }
}