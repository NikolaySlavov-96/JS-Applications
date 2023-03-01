import { html } from "../../node_modules/lit-html/lit-html.js";
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getAlbums } from "../api/data.js";


const cardTemplate = (data) => html`
<li class="card">
    <img src="${data.imageUrl}" alt="travis" />
    <p>
        <strong>Singer/Band: </strong><span class="singer">${data.singer}</span>
    </p>
    <p>
        <strong>Album name: </strong><span class="album">${data.album}</span>
    </p>
    <p><strong>Sales:</strong><span class="sales">${data.sales}</span></p>
    <a class="details-btn" href="/detail/${data._id}">Details</a>
</li>`;

const catalogTemplate = (data, hasData) => html`
<section id="dashboard">
    <h2>Albums</h2>
    ${hasData ? 
    html`
        <ul class="card-wrapper">
            ${repeat(data, el => el._id, cardTemplate)}
        </ul>
    ` : 
    html`
        <h2>There are no albums added yet.</h2>
    `}
</section>`;

export async function catalogView(ctx) {
    let hasData = true;
    const dataAlbum = await getAlbums();
    
    if(dataAlbum.length == 0) {
        hasData = false;
    }

    ctx.render(catalogTemplate(dataAlbum, hasData))
}