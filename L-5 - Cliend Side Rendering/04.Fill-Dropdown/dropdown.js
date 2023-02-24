import { render } from './node_modules/lit-html/lit-html.js';
import { getElement, postElement } from './data.js';
import { optionTemplete } from './templating.js';

const rootMenu = document.getElementById('menu');
const formData = document.querySelector('form');
formData.addEventListener('submit', onSubmit);

getAllElements();

async function getAllElements() {
    const data = await getElement();
    const allDate = Object.values(data);
    render(allDate.map(el => optionTemplete(el)), rootMenu);
}


async function onSubmit(ev) {
    ev.preventDefault();
    const inputData = document.getElementById('itemText').value;
    await postElement(inputData);
    formData.reset();
    getAllElements()
}

