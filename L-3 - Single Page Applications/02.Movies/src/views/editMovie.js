import { putRequest } from '../api.js';
import { createSubmitHandler, endPoints } from '../untils.js';

const section = document.getElementById('edit-movie');
const formData = section.querySelector('form');
createSubmitHandler(formData, onSubmit);
section.remove();

let ctx = null;
let idMovie = undefined;

export function showEdit(inCtx, inIdMovie) {
    ctx = inCtx;
    ctx.renderDom(section);
    if(typeof inIdMovie == 'object') {
        idMovie = inIdMovie._id;
        ctx.editViewFielt(inIdMovie);
    }
}

async function onSubmit(dataIn) {
    const data = await putRequest(endPoints.movieRequest + '/' + idMovie, dataIn);
    formData.reset();
    ctx.goTo('movie-example', data);
}