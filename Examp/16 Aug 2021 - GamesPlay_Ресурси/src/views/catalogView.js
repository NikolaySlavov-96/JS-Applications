import { getAllGames } from '../api/games.js';
import { html, repeat } from '../lib.js';

const gameCard = (content) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src="${content.imageUrl}">
        <h6>${content.category}</h6>
        <h2>${content.title}</h2>
        <a href="/catalog/${content._id}" class="details-button">Details</a>
    </div>

</div>`;

const catalogTemplate = (games, isGames) => html`
<section id="catalog-page">
    <h1>All Games</h1>

    ${isGames ? repeat(games, i => i._id, gameCard) : html`
    <h3 class="no-articles">No articles yet</h3>`};
    
</section>`;

export async function catalogView(ctx) {
    const allGame = await getAllGames();
    let isGames = true;

    if(allGame.length == 0) {
        isGames = false;
    }
    ctx.renderMain(catalogTemplate(allGame, isGames))
}