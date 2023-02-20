import { postRequest } from "../api.js";
import { createSubmitHandler, endPoints } from "../untils.js";

const section = document.getElementById('add-movie');
const formData = section.querySelector('form');
createSubmitHandler(formData, onSubmit);
section.remove();

let ctx = null;
export function showAddMovie(inCtx) {
    ctx = inCtx;
    ctx.renderDom(section);
}

async function onSubmit(dataIn) {
    if(dataIn.title == '' || dataIn.description == '' || dataIn.img == '') {
        alert('all field is required');
        return
    }
    const dataResponse = await postRequest(endPoints.movieGetCreate, dataIn);
    ctx.goTo('homeView');
    formData.reset();
}