import { html, nothing } from "../lib.js";
import { deleteElement, getDetailForElement } from "../data/product.js";
import { createDonation, getAllDonation, isDonationUser } from "../data/donation.js";

const allBtn = (id, infoForProduct, functionsEdit) => html`
<div class="btns">
    ${infoForProduct.isOwner ? 
        html`
    <a href="/edit/${id}" class="edit-btn btn">Edit</a>
    <a @click=${functionsEdit.deleteItem} href="#" class="delete-btn btn">Delete</a>` : 
    nothing}
    ${!infoForProduct.isDonation && !infoForProduct.isOwner ? 
        html`
            <a @click=${functionsEdit.donateItem} href="#" class="donate-btn btn">Donate</a>` : 
        nothing}
</div>`;


const detailTemplate = (data, infoForProduct, functionsEdit) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>
    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src="${data.imageUrl}" alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${data.title}</h2>
                <p class="post-description">Description: ${data.description}</p>
                <p class="post-address">Address: ${data.address}</p>
                <p class="post-number">Phone number: ${data.phone}</p>
                <p class="donate-Item">Donate Materials: ${infoForProduct.allDonation}</p>

                ${infoForProduct.isLogin && !infoForProduct.donateItem ? allBtn(data._id, infoForProduct, functionsEdit) : nothing}
            </div>
        </div>
    </div>
</section>`;

export async function detailView(ctx) {
    const idProduct = ctx.params.id;
    const data = await getDetailForElement(idProduct);
    const allDonation = await getAllDonation(idProduct);

    const dataProduct = {
        isLogin: ctx.user ? true : false, // undefine isNot login
        isOwner: false,
        isDonation: false,
        allDonation: allDonation || 0,
    }
    const functionsEdit = {
        deleteItem,
        donateItem,
    }

    if (dataProduct.isLogin) {
        const idOwner = data._ownerId;
        dataProduct.isOwner = idOwner == ctx.user.id ? true : false;
        const isDonation = await isDonationUser(idProduct, ctx.user.id);
        if(isDonation > 0) {
            dataProduct.isDonation = true;;
        }
    }

    ctx.renderMain(detailTemplate(data, dataProduct, functionsEdit));

    async function deleteItem(ev) {
        ev.preventDefault();
        const choise = confirm('Are you sure');

        if(choise) {
            await deleteElement(idProduct);
            ctx.page.redirect('/catalog');
        }
    }

    async function donateItem(ev) {
        ev.preventDefault();
        await createDonation(idProduct);
        ctx.page.redirect('/catalog/' + idProduct);
    }
}