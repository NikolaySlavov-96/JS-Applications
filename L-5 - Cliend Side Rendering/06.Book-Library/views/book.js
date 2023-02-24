import { html } from '../node_modules/lit-html/lit-html.js';

export function tableRow(allData, fnEdit) {
    const tr = html`
    <tr id=${allData[0]}>
        ${tableCol(allData[1], fnEdit)}
    </tr>
    `;
    return tr
}


function tableCol(data, fnEdit) {
    return html`
    <td>${data.author}</td>
    <td>${data.title}</td>
    <td>
        <button @click=${fnEdit}>Edit</button>
        <button>Delete</button>
    </td>
`;
}

//author: "J.K.Rowling", title: "Harry Potter and the Philosopher's Stone"  
/*
<tr>
    <td>Harry Potter</td>
    <td>J. K. Rowling</td>
    <td>
        <button>Edit</button>
        <button>Delete</button>
    </td>
</tr>
 */