import { html, render } from './node_modules/lit-html/lit-html.js';

const form = document.querySelector('form');
form.addEventListener('submit', onSubmit);

const rootElement = document.getElementById('root');

function onSubmit(ev) {
    ev.preventDefault();
    const dataForm = new FormData(form);
    const {towns} = Object.fromEntries(dataForm);
    const townsArr = towns.split(', ');
    renderTownList(townsArr);
    form.reset();
}

function renderTownList(data) {
    const result = createTownList(data);
    render(result, rootElement);
}

function createTownList(data) {
    const ul = html`
        <ul>
            ${data.map(el => html`<li>${el}</li>`)}
        </ul>`

    return ul;
}