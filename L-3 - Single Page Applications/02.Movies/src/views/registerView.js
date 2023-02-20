import { postRequest } from "../api.js";
import { createSubmitHandler, endPoints } from '../untils.js'

const section = document.getElementById('form-sign-up');
const formData = section.querySelector('form');
createSubmitHandler(formData, onSubmit);
section.remove();


let ctx = null;
export function showRegister(inCtx) {
    ctx = inCtx;
    ctx.renderDom(section);
}

async function onSubmit(dataIn) {
    if(dataIn.email == '' || dataIn.password == '' || dataIn.password.length < 6 ) {
        alert('email or password is not field correct');
        return
    }

    if(dataIn.password !== dataIn.repeatPassword) {
        alert('password is not equal');
        return
    }
    
    const dataResponse = await postRequest(endPoints.register, dataIn);

    const userData = {
        email: dataResponse.email,
        accessToken: dataResponse.accessToken,
        id: dataResponse._id
    }

    sessionStorage.setItem('userData', JSON.stringify(userData));
    ctx.checkUserNav();
    ctx.goTo('homeView');
}