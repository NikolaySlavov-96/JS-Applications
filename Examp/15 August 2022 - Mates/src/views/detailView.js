import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { dellShoe, getSpecificShoe } from "../data/mate.js";

const btnTemplate = (isOwner, id, onDelete) => html`${isOwner ? html`
<div id="action-buttons">
    <a href="/edit/${id}" id="edit-btn">Edit</a>
    <a @click=${onDelete} href="" id="delete-btn">Delete</a>
</div>`: nothing}`;


const detailTemplate = (isOwner, content, onDelete) => html`        
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
            <img src="${content.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p>Brand: <span id="details-brand">${content.brand}</span></p>
            <p>
                Model: <span id="details-model">${content.model}</span>
            </p>
            <p>Release date: <span id="details-release">${content.release}</span></p>
            <p>Designer: <span id="details-designer">${content.designer}</span></p>
            <p>Value: <span id="details-value">${content.value}</span></p>
        </div>
        <!--Edit and Delete are only for creator-->
        ${btnTemplate(isOwner, content._id, onDelete)}
    </div>
</section>`

export async function detailView(ctx) {
    const shoeId = ctx.params.id
    const dataSpecific = await getSpecificShoe(shoeId);

    const ownerId = dataSpecific._ownerId;
    const users = ctx?.user
    let userId = null;
    console.log(userId)
    if(users) {
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
        ctx.page.redirect('/dashboard');
    }
}