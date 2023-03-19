import { html } from '../lib.js';
import { editMeme, getMeme } from '../api/games.js';
import { submitHandler } from '../utility/utility.js';
import { notification } from './notificationView.js';

const editTemplate = (onSubmit, content) => html`
<section id="edit-meme">
    <form @submit=${onSubmit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title" .value=${content.title}>
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description" .value=${content.description}>
            </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value=${content.imageUrl}>
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>`;

export async function editView(ctx) {
    const isMeme = ctx.params.id;
    const data = await getMeme(isMeme);
    ctx.renderMain(editTemplate(submitHandler(onSubmit), data));

    async function onSubmit({ title, description, imageUrl }) {
        if ([title, description, imageUrl].some(e => e == '')) {
            notification('all field is required');
            return
        }

        await editMeme(isMeme, { title, description, imageUrl });
        ctx.page.redirect('/catalog/' + isMeme);
    }
}