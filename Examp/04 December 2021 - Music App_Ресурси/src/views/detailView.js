import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { dellShoe, getSpecificShoe } from "../data/mate.js";

const btnTemplate = (isOwner, id, onDelete) => html`${isOwner ? html`
<div class="actionBtn">
    <a href="/edit/${id}" class="edit">Edit</a>
    <a @click=${onDelete} href="#" class="remove">Delete</a>
</div>`: nothing}`;


const detailTemplate = (isOwner, content, onDelete) => html`        
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${content.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">

                <h1>Name: ${content.name}</h1>
                <h3>Artist: ${content.artist}</h3>
                <h4>Genre: ${content.genge}</h4>
                <h4>Price: $${content.price}</h4>
                <h4>Date: ${content.releaseDate}</h4>
                <p>Description: ${content.description}</p>
            </div>
            <!-- Only for registered user and creator of the album-->
            ${btnTemplate(isOwner, content._id, onDelete)}
        </div>
    </div>
</section>`

export async function detailView(ctx) {
    const shoeId = ctx.params.id
    const dataSpecific = await getSpecificShoe(shoeId);

    const ownerId = dataSpecific._ownerId;
    const users = ctx?.user
    let userId = null;
    if (users) {
        userId = users.id;
    }

    let hasOwner = false;
    if (ownerId == userId) {
        hasOwner = true;
    }

    ctx.renderSection(detailTemplate(hasOwner, dataSpecific, onDelete));

    async function onDelete(ev) {
        ev.preventDefault()
        const dataAwailt = await dellShoe(shoeId);
        ctx.page.redirect('/catalog');
    }
}