import { html, nothing } from "../lib.js";
import { deleteElement, getDetailForElement } from "../data/product.js";
import { createDonation, getAllDonation, isDonationUser } from "../data/donation.js";

const allBtn = (id, infoForProduct, functionsEdit) => html`
<div class="actionBtn">
    <!-- Only for registered user and creator of the pets-->
    ${infoForProduct.isOwner ? html`
    <a href="/edit/${id}" class="edit">Edit</a>
    <a @click=${functionsEdit.deleteItem} href="#" class="remove">Delete</a>` : 
    html`<a @click=${functionsEdit.donateItem} href="#" class="donate">Donate</a>`}
</div>
</div>`;

const detailTemplate = (data, infoForProduct, functionsEdit) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src="${data.image}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${data.name}</h1>
                <h3>Breed: ${data.breed}</h3>
                <h4>Age: ${data.age}</h4>
                <h4>Weight: ${data.weight}</h4>
                <h4 class="donation">Donation: ${infoForProduct.allDonation * 100}$</h4>
            </div>
            <!-- if there is no registered user, do not display div-->
            ${infoForProduct.isLogin && !infoForProduct.isDonation ? allBtn(data._id, infoForProduct, functionsEdit) : nothing}
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
        const idOwners = data._ownerId;
        dataProduct.isOwner = idOwners == ctx.user.id ? true : false;
        const isDonation = await isDonationUser(idProduct, ctx.user.id);

        if (isDonation > 0) {
            dataProduct.isDonation = true;;
        }
    }
    console.log(!dataProduct.isDonation)
    ctx.renderMain(detailTemplate(data, dataProduct, functionsEdit));

    async function deleteItem(ev) {
        ev.preventDefault();
        const choise = confirm('Are you sure');

        if (choise) {
            await deleteElement(idProduct);
            ctx.page.redirect('/');
        }
    }

    async function donateItem(ev) {
        ev.preventDefault();
        await createDonation(idProduct);
        ctx.page.redirect('/catalog/' + idProduct);
    }
}