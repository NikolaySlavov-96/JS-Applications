import { createMeme } from '../api/games.js';
import { html } from '../lib.js';
import { submitHandler } from '../utility/utility.js';
import { notification } from './notificationView.js';

const createTemplate = (onSubmit) => html`
<section id="create-meme">
    <form @submit=${onSubmit} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>`;

export function createView(ctx) {

    ctx.renderMain(createTemplate(submitHandler(onSubmit)));

    async function onSubmit({ title, description, imageUrl }) {
        if ([title, description, imageUrl].some(e => e == '')) {
            notification('all field is required');
            return
        }

        await createMeme({ title, description, imageUrl });
        ctx.page.redirect('/catalog');
    }
}

