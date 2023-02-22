const section = document.getElementById('registerView');
section.remove();

let ctx = null;
export function registerSection(inCtx) {
    ctx = inCtx;
    ctx.renderDom(section);
}