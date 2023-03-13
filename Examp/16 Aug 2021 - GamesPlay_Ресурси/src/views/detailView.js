import { getGame } from '../api/games.js';
import { html } from '../lib.js';

const btnTemplate = () => html``

const detailTemplate = (content, setting) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">

        <div class="game-header">
            <img class="game-img" src="images/MineCraft.png" />
            <h1>${content.title}</h1>
            <span class="levels">MaxLevel: ${content.maxLevel}</span>
            <p class="type">${content.category}</p>
        </div>

        <p class="text">${content.summary}</p>


        <!-- Bonus ( for Guests and Users ) -->
        <div class="details-comments">
            <h2>Comments:</h2>
            <ul>
                <!-- list all comments for current game (If any) -->
                <li class="comment">
                    <p>Content: I rate this one quite highly.</p>
                </li>
                <li class="comment">
                    <p>Content: The best game.</p>
                </li>
            </ul>
            <!-- Display paragraph: If there are no games in the database -->
            <p class="no-comment">No comments.</p>
        </div>

        <!-- Edit/Delete buttons ( Only for creator of this game )  -->
        <div class="buttons">
            <a href="#" class="button">Edit</a>
            <a href="#" class="button">Delete</a>
        </div>
    </div>

    <!-- Bonus -->
    <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
    <article class="create-comment">
        <label>Add new comment:</label>
        <form class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>

</section>`;

export async function detailView(ctx) {
    const idGame = ctx.params.id;
    const dataGame = await getGame(idGame);
    const menuSetting = {
        isOwner: false,
        isLogin: false,
    }
    const userData = ctx.user;
    if(userData !== undefined) {
        menuSetting.isLogin = true;
        if(userData.id == dataGame._ownerId) {
            menuSetting.isOwner = true;
        }
    }

    ctx.renderMain(detailTemplate(dataGame, menuSetting));
}