import { getAllProducts } from "../data/product.js";
import { html, repeat } from "../lib.js";

const cardProduct = (data) => html`
    <div class="post">
        <h2 class="post-title">${data.title}</h2>
        <img class="post-image" src="${data.imageUrl}" alt="Kids clothes">
        <div class="btn-wrapper">
            <a href="/catalog/${data._id}" class="details-btn btn">Details</a>
        </div>
    </div>`;

const catalogTemplate = (data, isProducts) => html`
<section id="dashboard-page">
    <h1 class="title">All Posts</h1>
    ${isProducts ? 
        html`<div class="all-posts">
            ${repeat(data, e => e.id, cardProduct)}
            </div>` : 
        html`<h1 class="title no-posts-title">No posts yet!</h1>`}
</section > `;


export async function catalogView(ctx) {
    const products = await getAllProducts();
    let isProducts = true;
    if(products.length == 0) {
        isProducts = false;
    }

    ctx.renderMain(catalogTemplate(products, isProducts));
}