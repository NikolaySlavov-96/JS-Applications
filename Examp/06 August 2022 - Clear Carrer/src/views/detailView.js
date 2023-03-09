import { addAgree, deleteOffers, getAllAgreeNumber, getOfferst, specificAgree } from "../api/data.js";
import { html, nothing } from "../lib.js";

const btnTemplate = (hasBooleat, inId, onDelete, onAgree) => html`
<div id="action-buttons">
    ${hasBooleat.isOwner ? html`
    <a href="/edit/${inId}" id="edit-btn">Edit</a>
    <a href="" @click=${onDelete} id="delete-btn">Delete</a>
    ` : nothing}
    ${!hasBooleat.isAgree && !hasBooleat.isOwner ? html`
    <a href="" @click=${onAgree} id="apply-btn"> Apply</a>` : nothing}
</div>`;

const detailTemplate = (dataOfferts, hasBooleat, allAgree, onDelete, onAgree) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="${dataOfferts.imageUrl}" alt="example1" />
        <p id="details-title">${dataOfferts.title}</p>
        <p id="details-category">
            Category: <span id="categories">${dataOfferts.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${dataOfferts.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${dataOfferts.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${dataOfferts.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">${allAgree}</strong></p>
        ${hasBooleat.isLoged ? btnTemplate(hasBooleat, dataOfferts._id, onDelete, onAgree) : nothing};
        <!--Edit and Delete are only for creator-->

    </div>
</section>`


export async function detailView(ctx) {
    const hasBooleat = {
        isLoged: false,
        isAgree: false,
        isOwner: false,
    }
    const idOfferts = ctx.params.id;
    const dataOfferts = await getOfferst(idOfferts);
    const allAgree = await getAllAgreeNumber(idOfferts);

    if (ctx.user) {
        hasBooleat.isLoged = true;
        const isAgree = await specificAgree(idOfferts, ctx.user.id);
        if (isAgree > 0) {
            hasBooleat.isAgree = true;
        }
        const offerstOwnerId = dataOfferts._ownerId;
        if (ctx.user.id == offerstOwnerId) {
            hasBooleat.isOwner = true;
        }
    }
    console.log(hasBooleat)
    ctx.renderSection(detailTemplate(dataOfferts, hasBooleat, allAgree, onDelete, onAgree));

    async function onDelete(ev) {
        ev.preventDefault();
        const deleteApi = await deleteOffers(idOfferts);
        ctx.page.redirect('/catalog');
    }

    async function onAgree(ev) {
        ev.preventDefault();
        const resultAdd = await addAgree({ offerId: idOfferts });
        ctx.page.redirect('/catalog/' + idOfferts);
    }
}