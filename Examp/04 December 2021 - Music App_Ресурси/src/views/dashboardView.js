import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { repeat } from "../../node_modules/lit-html/directives/repeat.js";
import { getAllShoes } from "../data/mate.js";

const cardShoe = (contet) => html`
<div class="card-box">
    <img src="${contet.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${contet.name}</p>
            <p class="artist">Artist: ${contet.artist}</p>
            <p class="genre">Genre: ${contet.genre}</p>
            <p class="price">Price: $${contet.price}</p>
            <p class="date">Release Date: ${contet.releaseDate}</p>
        </div>
        ${contet.users ? html`
        <div class="btn-group">
            <a href="/catalog/${contet._id}" id="details">Details</a>
        </div>` : nothing}
    </div>
</div>`;

const dashboardTemplate = (isState, data) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
    ${isState ? repeat(data, el => el._id, cardShoe) : 
        html`<p>No Albums in Catalog!</p>`}
</section>`;

export async function dashboardView(ctx) {
    let isShoe = true;
    const dataShoe = await getAllShoes();

    const logedUser = ctx.user ? true : false;

    dataShoe.map(u => u.users = logedUser);

    if (dataShoe.length == 0) {
        isShoe = false;
    }

    ctx.renderSection(dashboardTemplate(isShoe, dataShoe));
}