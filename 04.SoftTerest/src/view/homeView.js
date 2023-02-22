const section = document.getElementById('homeView');
section.remove();

let ctx = null;
export function homeSection(inCtx) {
    ctx = inCtx;
    ctx.renderDom(section);
}