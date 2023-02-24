import { html } from './node_modules/lit-html/lit-html.js';

export function optionTemplete(data) {
    return html`
    <option value=${data._id}>${data.text}</option>
    `;
}