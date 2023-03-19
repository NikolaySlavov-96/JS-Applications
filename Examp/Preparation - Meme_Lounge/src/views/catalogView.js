import { getAllMeme } from '../api/games.js';
import { html, repeat } from '../lib.js';

const memeCard = (content) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${content.title}</p>
            <img class="meme-image" alt="meme-img" src="${content.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href="/catalog/${content._id}">Details</a>
        </div>
    </div>
</div>`;

const catalogTemplate = (games, isMeme) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">

        ${isMeme ? repeat(games, i => i._id, memeCard) : html`
        <p class="no-memes">No memes in database.</p>`};

    </div>
</section>`;

export async function catalogView(ctx) {
    const allMeme = await getAllMeme();
    let isMeme = true;

    if (allMeme.length == 0) {
        isMeme = false;
    }
    ctx.renderMain(catalogTemplate(allMeme, isMeme))
}