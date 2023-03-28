import { getAllProducts } from "../data/product.js";
import { html, repeat } from "../lib.js";

const cardProduct = (data) => html`
<div class="animals-board">
    <article class="service-img">
        <img class="animal-image-cover" src="${data.image}">
    </article>
    <h2 class="name">${data.name}</h2>
    <h3 class="breed">${data.breed}</h3>
    <div class="action">
        <a class="btn" href="/catalog/${data._id}">Details</a>
    </div>
</div>`;

const catalogTemplate = (data, isProducts) => html`
<section id="dashboard">
    <h2 class="dashboard-title">Services for every animal</h2>
    <div class="animals-dashboard">
    ${isProducts ? 
            repeat(data, e => e.id, cardProduct) : 
        html`<div>
                <p class="no-pets">No pets in dashboard</p>
            </div>`}
    </div>
</section > `;


export async function catalogView(ctx) {
    const products = await getAllProducts();
    let isProducts = true;
    if(products.length == 0) {
        isProducts = false;
    }

    ctx.renderMain(catalogTemplate(products, isProducts));
}