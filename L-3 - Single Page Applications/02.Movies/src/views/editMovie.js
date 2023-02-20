import { putRequest,getRequest } from '../api.js';
import { createSubmitHandler, endPoints } from '../untils.js';

const section = document.getElementById('edit-movie');
const formData = section.querySelector('form');
createSubmitHandler(formData, onSubmit);
section.remove();

let ctx = null;

export function showEdit(inCtx) {
    ctx = inCtx;
    ctx.renderDom(section);
}

async function onSubmit(dataIn) {
    const editMovie = new FormData(formData);
    const id = formData.querySelector('h1').id
    const data = await putRequest(endPoints.movieRequest + '/' + id, dataIn);
    formData.reset();
    ctx.goTo('movie-example')
    ctx.movieDetails(data)
}