import { html } from "../../node_modules/lit-html/lit-html.js";
import { editAlbum, getAlbum } from "../api/data.js";
import { submitHangler } from "../until.js";

const editTemplate = (onSubmit, data) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Album</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="singer" id="album-singer" .value=${data.singer} placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" .value=${data.album} placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" .value=${data.imageUrl} placeholder="Image url" />
            <input type="text" name="release" id="album-release" .value=${data.release} placeholder="Release date" />
            <input type="text" name="label" id="album-label" .value=${data.label} placeholder="Label" />
            <input type="text" name="sales" id="album-sales" .value=${data.sales} placeholder="Sales" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;


export async function editView(ctx) {
    const albumId = ctx.params.id
    const data = await getAlbum(albumId);
    ctx.render(editTemplate(submitHangler(onSubmit), data));

    async function onSubmit({ singer, album, imageUrl, release, label, sales }) {
        // TO DO Validation
        if (singer == '' || album == '' || imageUrl == '' || release == '' || label == '' || sales == '') {
            return alert('all fields is required');
        }

        
        const data = await editAlbum(albumId, { singer, album, imageUrl, release, label, sales });
        ctx.page.redirect('/detail/' + albumId);
    }
}
