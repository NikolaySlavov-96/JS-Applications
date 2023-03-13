import { html, repeat } from '../lib.js';
import { getHomeGame } from '../api/games.js';

const gameCard = (content) => html`
<div class="game">
    <div class="image-wrap">
        <img src="${content.imageUrl}">
    </div>
    <h3>${content.title}</h3>
    <div class="rating">
        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
    </div>
    <div class="data-buttons">
        <a href="/catalog/${content._id}" class="btn details-btn">Details</a>
    </div>
</div>`;

const homeTemplate = (games, isGame) => html`
<section id="welcome-world">
    <div class="welcome-message">
        <h2>ALL new games are</h2>
        <h3>Only in GamesPlay</h3>
    </div>
    <img src="./images/four_slider_img01.png" alt="hero">

    <div id="home-page">
        <h1>Latest Games</h1>

        ${isGame ? repeat(games, i => i._id, gameCard) : 
            html`
        <p class="no-articles">No games yet</p>`}

    </div>
</section>`;

export async function homeView(ctx) {
    const homeGame = await getHomeGame()
    let isGame = true;

    if(homeGame.length == 0) {
        isGame = false;
    }

    ctx.renderMain(homeTemplate(homeGame, isGame));
}