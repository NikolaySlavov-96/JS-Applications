import { html } from "../../node_modules/lit-html/lit-html.js";
import { editSpecificShoe, getSpecificShoe } from "../data/mate.js";
import { submitHandler } from "../until.js";


const editTemplate = (onSubmit, content) => html`
<section class="editPage">
    <form @submit=${onSubmit}>
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" class="name" type="text" value="${content.name}">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" value="${content.imgUrl}">

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" class="price" type="text" value="${content.price}">

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" value="${content.releaseDate}">

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" class="artist" type="text" value="${content.artist}">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" class="genre" type="text" value="${content.genre}">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" class="description" rows="10"
                    cols="10">${content.description}</textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>`;

export async function editView(ctx) {
    const idShoe = ctx.params.id;
    const dataOpenShoe = await getSpecificShoe(idShoe)

    ctx.renderSection(editTemplate(submitHandler(onSubmit), dataOpenShoe));

    async function onSubmit({ name, imgUrl, price, releaseDate, artist, genre, description }) {
        if (name == '' || imgUrl == '' || price == '' || releaseDate == '' || artist == '' || genre == '' || description == '') {
            return alert('all field is required')
        }

        const dataResultShoe = await editSpecificShoe(idShoe, { name, imgUrl, price, releaseDate, artist, genre, description });
        ctx.page.redirect('/catalog');
    }
}