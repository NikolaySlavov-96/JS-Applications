import { html, render } from './node_modules/lit-html/lit-html.js';
import { towns } from './towns.js'

document.querySelector('button').addEventListener('click', search)
const rootParent = document.getElementById('towns');
const userInput = document.getElementById('searchText');
const outputResult = document.getElementById('result');

updateInfo();

function ulTempleteFn(townsName, match) {
   const ulTemplete = html`
   <ul>
      ${townsName.map(t => liTemplateTown(t, match))}
   </ul>
`;
   return ulTemplete;
}

function liTemplateTown(town, matchTex) {
   return html`
   <li class="${matchTex && town.toLowerCase().includes(matchTex) ? 'active' : ''}">${town}</li>
`;
}

function updateInfo(modifedInput) {
   render(ulTempleteFn(towns, modifedInput), rootParent);
}

function search() {
    const modifedInput = userInput.value.toLowerCase();
    updateInfo(modifedInput);
    updateCountet();
    userInput.value = '';
}

function updateCountet() {
    const countResult = document.querySelectorAll('.active').length;
    const printResult = countResult ? html`<p>${countResult} matches found</p>` : '';
    render(printResult, outputResult)
}