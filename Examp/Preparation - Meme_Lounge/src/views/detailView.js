import { html, nothing } from '../lib.js';
import { deleteMeme, getMeme } from '../api/games.js';

const btnTemplate = (content, onDelete) => html`
<div class="buttons">
    <a class="button warning" href="/edit/${content._id}">Edit</a>
    <button @click=${onDelete} class="button danger">Delete</button>
</div>`


const detailTemplate = (content, setting, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${content.title}

    </h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${content.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p> ${content.description}</p>

            ${setting.isOwner ? btnTemplate(content, onDelete) : nothing}

        </div>
    </div>
</section>`;

export async function detailView(ctx) {
    const idMeme = ctx.params.id;
    const dataMeme = await getMeme(idMeme);

    const menuSetting = {
        isOwner: false,
        isLogin: false,
    }

    const userData = ctx.user;
    if (userData !== undefined) {
        menuSetting.isLogin = true;
        if (userData.id == dataMeme._ownerId) {
            menuSetting.isOwner = true;
        }
    }

    ctx.renderMain(detailTemplate(dataMeme, menuSetting, onDelete));

    async function onDelete(ev) {
        ev.preventDefault();
        await deleteMeme(idMeme);
        ctx.page.redirect('/catalog');
    }
}