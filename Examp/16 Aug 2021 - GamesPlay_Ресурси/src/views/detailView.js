import { html, nothing, repeat } from '../lib.js';
import { addComment, deleteGame, getAllComents, getGame } from '../api/games.js';
import { submitHandler } from '../utility/utility.js';

const cardComment = (content) => html`
<li class="comment">
    <p>Content: ${content.comment}</p>
</li>`;

const commentTemplate = (setting, comments) => html`
<div class="details-comments">
    <h2>Comments:</h2>
    ${setting.isComments ? 
        html`
    <ul>
        ${repeat(comments, i => i._id, cardComment)}
    </ul>` : 
    html`<p class="no-comment">No comments.</p>`}
</div>`;

const btnTemplate = (content, onDelete) => html`
<div class="buttons">
    <a href="/edit/${content._id}" class="button">Edit</a>
    <a @click=${onDelete} href="#" class="button">Delete</a>
</div>`

const formAddCommentTemplate = (createComment) => html`
    <article class="create-comment">
        <label>Add new comment:</label>
        <form @submit=${createComment} class="form">
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment">
        </form>
    </article>
`

const detailTemplate = (content, setting, onDelete, allCommentsForGame, createComment) => html`
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

        ${commentTemplate(setting, allCommentsForGame)}

        ${setting.isOwner ? btnTemplate(content, onDelete) : nothing};
    </div>

    ${!setting.isOwner && setting.isLogin ? formAddCommentTemplate(createComment) : nothing};

</section>`;

export async function detailView(ctx) {
    const idGame = ctx.params.id;
    const dataGame = await getGame(idGame);
    const allCommentsForGame = await getAllComents(idGame);

    const menuSetting = {
        isOwner: false,
        isLogin: false,
        isComments: true,
    }

    if(allCommentsForGame.length == 0) {
        menuSetting.isComments = false;
    }

    const userData = ctx.user;
    if (userData !== undefined) {
        menuSetting.isLogin = true;
        if (userData.id == dataGame._ownerId) {
            menuSetting.isOwner = true;
        }
    }

    ctx.renderMain(detailTemplate(dataGame, menuSetting, onDelete,allCommentsForGame, submitHandler(createComment)));

    async function onDelete(ev) {
        ev.preventDefault();
        await deleteGame(idGame);
        ctx.page.redirect('/');
    }

    async function createComment({comment}, events) {
        const dataSend = {
            gameId: idGame,
            comment,
        }
        
        if(comment == '') {
            return alert('all fields is required')
        }

        await addComment(dataSend);
        events.reset();
        ctx.page.redirect('/catalog/' + idGame)
    }
}