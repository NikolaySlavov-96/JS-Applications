import { postRequest } from '../api.js';
import { endPoints } from '../config.js';
import { createSubmitHandler } from '../until.js';

const section = document.getElementById('shareView');
const formData = section.querySelector('form');
createSubmitHandler(formData, onSubmit);
section.remove();

let ctx = null;
export function createSection(inCtx) {
    ctx = inCtx
    ctx.renderDom(section)
}

async function onSubmit(dataIn) {
    console.log(dataIn);
    if(dataIn.title.length < 6 || dataIn.description.length < 10 || dataIn.imageURL.length < 5) {
        alert('input field is not input correct');
        return;
    }
    await postRequest(endPoints.ideaCreate, dataIn);

    ctx.goTo('/');
    formData.reset();
}