import { html } from "../../node_modules/lit-html/lit-html.js";
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { gerProducts } from '../api/data.js';


const productTemplate = (data, isEmpty) => html`
<h2>Products</h2>
<section id="dashboard">
    ${isEmpty ? repeat(data, el => el._id, cardProduct) : html`<h2>No products yet.</h2>`}
</section>`;

function cardProduct(data) {
    return html`
    <div class="product">
        <img src="${data.imageUrl}" alt="example1" />
        <p class="title">${data.name}</p>
        <p><strong>Price:</strong><span class="price">${data.price}</span>$</p>
        <a class="details-btn" href="/detail/${data._id}">Details</a>
    </div>`;
}

export async function createView(ctx) {
    const data = await gerProducts();
    let isEmpty = true;
    if (data.length == 0) {
        isEmpty = false;
    }
    ctx.renderSection(productTemplate(data, isEmpty));
}