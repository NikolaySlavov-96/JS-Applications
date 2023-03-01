import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { allLikesAlbum, dellAlbum, getAlbum, likeAlbum, likeSpecificUser } from "../api/data.js";

const btnTemplate = (id, hasOwner, onDelete, isLogin, onLike) => html`
${isLogin || hasOwner ? html`
<div id="action-buttons">
    ${hasOwner ? html`
    <a href="/edit/${id}" id="edit-btn">Edit</a>
    <a @click=${onDelete} href="" id="delete-btn">Delete</a>
    ` : html`
    <a @click=${onLike} href="" id="like-btn">Like</a>
    `}
</div>` : nothing}`;

const detailTemplate = (data, hasOwner, onDelete, isLogin, onLike) => html`
    <section id="details">
        <div id="details-wrapper">
            <p id="details-title">Album Details</p>
            <div id="img-wrapper">
                <img src="${data.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
                <p><strong>Band:</strong><span id="details-singer">${data.singer}</span></p>
                <p>
                    <strong>Album name:</strong><span id="details-album">${data.album}</span>
                </p>
                <p><strong>Release date:</strong><span id="details-release">${data.release}</span></p>
                <p><strong>Label:</strong><span id="details-label">${data.label}</span></p>
                <p><strong>Sales:</strong><span id="details-sales">${data.sales}</span></p>
            </div>
            <div id="likes">Likes: <span id="likes-count">${data.likes}</span></div>
            ${btnTemplate(data._id, hasOwner, onDelete, isLogin, onLike)}
        </div>
    </section>
`;

export async function detailView(ctx) {
    const productId = ctx.params.id
    const dataAlbum = await getAlbum(productId);
    const likeAll = await allLikesAlbum(productId);
    dataAlbum.likes = likeAll;
    const ownerId = dataAlbum._ownerId
    
    let isLogin = false;
    let userId = null;
    let hasOwner = false;

    if(ctx.user) {
        isLogin = true;
        userId = ctx.user.id
        const isLikeBtn = await likeSpecificUser(productId, userId);
        if(isLikeBtn > 0) {
            isLogin = false;
        }
    }

    if (userId == ownerId) {
        hasOwner = true;
    }

    ctx.render(detailTemplate(dataAlbum, hasOwner, onDelete, isLogin, onLike))

    async function onDelete(ev) {
        ev.preventDefault()

        const responseDell = await dellAlbum(productId);
        ctx.page.redirect('/catalog');
    }

    async function onLike(ev) {
        ev.preventDefault();

        const addLike = await likeAlbum(productId);
        ctx.page.redirect('/detail/' + productId);
    }
}