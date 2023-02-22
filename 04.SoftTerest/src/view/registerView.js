import { postRequest } from '../api.js';
import { endPoints } from '../config.js';
import { createSubmitHandler, userDateSessionStorage } from '../until.js';

const section = document.getElementById('registerView');
const formData = section.querySelector('form');
createSubmitHandler(formData, onSubmit);
section.remove();

let ctx = null;
export function registerSection(inCtx) {
    ctx = inCtx;
    ctx.renderDom(section);
}

async function onSubmit(dataIn) {
    if(dataIn.email.length < 3 || dataIn.password.length < 3) {
        alert('minimal request not correct');
        return;
    }

    if(dataIn.password !== dataIn.repeatPassword) {
        alert('password is not equal');
        return;
    }

    const data = await postRequest(endPoints.register, dataIn);
    userDateSessionStorage(data);
    ctx.checkUserNav();
    ctx.goTo('/');
    formData.reset();
}