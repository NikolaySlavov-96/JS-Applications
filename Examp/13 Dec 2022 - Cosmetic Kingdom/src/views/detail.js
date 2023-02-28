import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { getSpecificProduct, deleteProduct, buyProduct, getProductInfo, getBoughtSpecificUser } from '../api/data.js'


const datailTemplate = (product, isOwner, isLogin, onDelete, onBuy, isBuy, couterBuy) => html`
<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src="${product.imageUrl}" alt="example1" />
        <p id="details-title">${product.name}</p>
        <p id="details-category">
            Category: <span id="categories">${product.category}</span>
        </p>
        <p id="details-price">
            Price: <span id="price-number">${product.price}</span>$</p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Bought: <span id="buys">${couterBuy}</span> times.</h4>
                <span>${product.description}</span>
            </div>
        </div>
        ${isLogin || isOwner ? btnTemplate(isOwner, isLogin, product._id, onDelete, onBuy, isBuy) : nothing};
    </div>
</section>`;

const btnTemplate = (isOwner, isLogin, id, onDelete, onBuy, isBuy) => html`
        <div id="action-buttons">
            ${isOwner ? 
                html`
            <a href="/edit/${id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="#" id="delete-btn">Delete</a>
            ` : nothing}
            ${isLogin && !isBuy && !isOwner ? 
                html`
            <a @click=${onBuy} href="" id="buy-btn">Buy</a>
            ` : nothing}
        </div>
`;

export async function datailView(ctx) {
    const idProduct = ctx.params.id;
    const product = await getSpecificProduct(idProduct);
    const isBuyProdoct = await getProductInfo(idProduct);
    
    const ownerProduct = product._ownerId;
    const idUser = ctx?.user?.id;
    let isOwner = false;
    let isLogin = false;
    let isBuy = false;
    if (ownerProduct == idUser) {
        isOwner = true;
    }
    if (ctx.user) {
        isLogin = true;
        const isBuySpecificProduct = await getBoughtSpecificUser(idProduct, idUser);
        if(isBuySpecificProduct > 0) {
            isBuy = true;
        }
    }
    ctx.renderSection(datailTemplate(product, isOwner, isLogin, onDelete, onBuy, isBuy, isBuyProdoct));

    async function onDelete(ev) {
        ev.preventDefault()
        const dell = await deleteProduct(idProduct);
        ctx.page.redirect('/catalog');
    }

    async function onBuy(ev) {
        ev.preventDefault();
        const result = await buyProduct(idProduct);
        ctx.page.redirect('/detail/' + idProduct);
    }
}