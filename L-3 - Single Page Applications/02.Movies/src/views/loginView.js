import { postRequest } from '../api.js';
import { createSubmitHandler, endPoints } from '../untils.js';

const section = document.getElementById('form-login');
const formData = section.querySelector('form');
createSubmitHandler(formData, onSubmit);
section.remove();

let ctx = null;
export function showLogin(inCtx) {
    ctx = inCtx;
    ctx.renderDom(section);
}

async function onSubmit(dataIn) {

    if(dataIn.email == '' || dataIn.password == '') {
        alert('fill correct information');
        return
    }
    const dataResponse = await postRequest(endPoints.login, dataIn);

    const userData = {
        email: dataResponse.email,
        accessToken: dataResponse.accessToken,
        id: dataResponse._id
    }

    sessionStorage.setItem('userData', JSON.stringify(userData));
    ctx.goTo('homeView');
    ctx.checkUserNav()
}