import { editGame, getGame } from '../api/games.js';
import { html } from '../lib.js';
import { submitHandler } from '../utility/utility.js';

const editTemplate = (onSubmit, content) => html`
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" value="${content.title}">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" value="${content.category}">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" value="${content.maxLevel}">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" value="${content.imageUrl}">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary" .value="${content.summary}"></textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>`;

export async function editView(ctx) {
    const idGame = ctx.params.id;
    const data = await getGame(idGame);
    ctx.renderMain(editTemplate(submitHandler(onSubmit), data));

    async function onSubmit({ title, category, maxLevel, imageUrl, summary }) {
        if ([title, category, maxLevel, imageUrl, summary].some(e => e == '')) {
            return alert('all field is required');
        }

        await editGame(idGame, { title, category, maxLevel, imageUrl, summary });
        ctx.page.redirect('/');
    }
}