const section = document.getElementById('detailView');
section.remove();

let ctx = null;
export function detailSection(inCtx) {
    ctx = inCtx
    ctx.renderDom(section)
}

section.addEventListener('click', onDelete);

function onDelete(ev) {
    ev.preventDefault();

    //logic given id and send delete request;
    console.log(ev.target);
}