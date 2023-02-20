import { dellRequest, getRequest } from "../api.js";
import { endPoints } from '../untils.js';

const section = document.getElementById('movie-example');
section.remove();

let ctx = null;
export function showMovie(inCtx) {
    ctx = inCtx;
    ctx.renderDom(section);
    document.getElementById('movie-example').addEventListener('click', onBtn);
}

const typeBtn = {
    'Like': btnLike,
    'Edit': btnEdit,
    'Delete': btnDelete,
}

function onBtn(ev) {
    ev.preventDefault()
    const event = ev.target;
    if(event.tagName == 'A') {
        const content = event.textContent;
        const idMovie = event.parentElement.id;
        const btn = typeBtn[content];
        btn(idMovie, event);
    }
}

function btnLike(id, event) {
    console.log('like')
    console.log(event.remove())
}

async function btnEdit(idMovie) {
    const data = await getRequest(endPoints.movieRequest + '/' + idMovie);
    ctx.goTo('editView');
    ctx.editViewFielt(data);
}

function btnDelete(idMovie) {
    dellRequest(endPoints.movieRequest + '/' + idMovie);
    ctx.goTo('homeView');
}

