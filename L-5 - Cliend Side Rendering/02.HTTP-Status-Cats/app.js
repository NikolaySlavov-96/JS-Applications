import { html, render } from './node_modules/lit-html/lit-html.js';
import { cats } from './catSeeder.js';

const rootElement = document.getElementById('allCats');

const catsTemplateUl = html`
    <ul>
        ${cats.map(x=> createCatLi(x))}
    </ul>
`;

render(catsTemplateUl, rootElement)

function createCatLi(cat) {
    return html`
     <li>
        <img src="./images/${cat.imageLocation}.jpg" width="250" height="250" alt="Card image cap">
        <div class="info">
            <button @click=${onClick} class="showBtn">Show status code</button>
            <div class="status" style="display: none" id=${cat.id}>
                <h4>Status Code: ${cat.statusCode}</h4>
                <p>${cat.statusMessage}</p>
            </div>
        </div>
    </li>`;
}

function onClick(e) {
    e.preventDefault();
    const parent = e.target.parentElement;
    const currentTarget = parent.querySelector('div');
    if(currentTarget.style.display == 'none') {
        currentTarget.style.display = 'block'
    } else {
        currentTarget.style.display = 'none'
    }
}