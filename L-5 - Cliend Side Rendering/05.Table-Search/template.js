import { html } from "./node_modules/lit-html/lit-html.js";

export function createRowInTable(data, match) {
    let isResult = false;
    if(data.firstName.toLowerCase().includes(match) || 
    data.lastName.toLowerCase().includes(match) || 
    data.email.toLowerCase().includes(match) || 
    data.course.toLowerCase().includes(match)) {
        isResult = true;
    }
    return html`
    <tr class="${isResult ? 'select' : ''}">
        <td>${data.firstName} ${data.lastName}</td>
        <td>${data.email}</td>
        <td>${data.course}</td>
    </tr>
    `;
}