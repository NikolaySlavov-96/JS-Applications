import { html } from "../../node_modules/lit-html/lit-html.js";
import { repeat } from "../../node_modules/lit-html/directives/repeat.js";
import { getAllShoes } from "../data/mate.js";

const cardShoe = (contet) => html`
<li class="card">
    <img src="${contet.imageUrl}" alt="travis" />
    <p>
        <strong>Brand: </strong><span class="brand">${contet.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${contet.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${contet.value}</span>$</p>
    <a class="details-btn" href="/dashboard/${contet._id}">Details</a>
</li>`;

const dashboardTemplate = (isState, data) => html`
<section id="dashboard">
    <h2>Collectibles</h2>
    ${isState ? html`
    <ul class="card-wrapper">
        ${repeat(data, el => el._id, cardShoe)}
    </ul>
    ` : html`<h2>There are no items added yet.</h2>`}
</section>`;

export async function dashboardView(ctx) {
    let isShoe = true;
    const dataShoe = await getAllShoes();
    if (dataShoe.length == 0) {
        isShoe = false;
    }

    ctx.renderSection(dashboardTemplate(isShoe, dataShoe));
}