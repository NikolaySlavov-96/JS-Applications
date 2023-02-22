import { postRequest } from '../api.js';
import { endPoints } from '../config.js';
import { createSubmitHandler, userDateSessionStorage } from '../until.js';

const section = document.getElementById('loginView');
const formDate = section.querySelector('form');
createSubmitHandler(formDate, onSubmit)
section.remove();

let ctx = null;
export function loginSection(inCtx) {
    ctx = inCtx
    ctx.renderDom(section)
}

async function onSubmit(dataIn) {
    if(dataIn.email == '' || dataIn.password == '') {
        alert('not field correct');
        return;
    }

    const login = await postRequest(endPoints.login, dataIn);
    userDateSessionStorage(login);
    ctx.checkUserNav();
    ctx.goTo('/');
    formDate.reset();
}