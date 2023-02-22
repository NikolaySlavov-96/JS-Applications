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
    if(dataIn.title.length < 6 || dataIn.description.length < 10 || dataIn.imageURL.length < 5) {
        alert('input field is not input correct');
        return;
    }
    const requestData = {
        title: dataIn.title,
        description: dataIn.description,
        img: dataIn.imageURL
    }
    await postRequest(endPoints.ideaCreate, requestData);
    
    formData.reset();
    ctx.goTo('/dashbord');
}


//Object { title: "fwqrqwr", description: "wqrqwrwqrqwrqw", imageURL: "wqrwqrwqrwrq" }
//Object { _id: "247efaa7-8a3e-48a7-813f-b5bfdad0f46c", title: "4 Eady DIY Idea To Try!", img: "./images/brightideacropped.jpg" }