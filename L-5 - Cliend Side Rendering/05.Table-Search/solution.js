import { html, render } from './node_modules/lit-html/lit-html.js';
import { createRowInTable } from './template.js';
import { allDetail } from './request.js';

const rootElement = document.querySelector('.container tbody');
document.querySelector('#searchBtn').addEventListener('click', onClick);
const dataFromUser = document.getElementById('searchField');

renderTr();

async function renderTr(match) {
   const data = Object.values(await allDetail());
   render(data.map(el => createRowInTable(el, match)), rootElement);
}

function onClick() {
   const valueFromUser = dataFromUser.value;
   console.log(valueFromUser);
   renderTr(valueFromUser);
   setTimeout(() => renderTr(), 1000);
   dataFromUser.value = '';
}