import { html } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getAllFurniture } from '../data/dataF.js';

const dashbordView = (data) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
    </div>
</div>
<div class="row space-top">
    ${repeat(data, el => el._id, productCards)}
</div>`;

function productCards(el) {
    return html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${el.img}" />
                <p>${el.description}</p>
                <footer>
                    <p>Price: <span>${el.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${el._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>
    `;
} 

export async function dashbordTemplate(ctx) {
    const data = await getAllFurniture()
    ctx.render(dashbordView(data))
}
