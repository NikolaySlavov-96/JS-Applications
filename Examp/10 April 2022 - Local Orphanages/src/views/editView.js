import { editDetailForElement, getDetailForElement } from "../data/product.js";
import { html } from "../lib.js";
import { submitHandler } from "../utility.js";

const editTemplate = (onSubmit, data) => html`
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <h1 class="title">Edit Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" id="title" value="${data.title}">
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" id="description" value="${data.description}">
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" id="imageUrl" value="${data.imageUrl}">
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" id="address" value="${data.address}">
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" id="phone" value="${data.phone}">
        </article>

        <input type="submit" class="btn submit" value="Edit Post">
    </form>
</section>`;

export async function editView(ctx) {
    const idProduct = ctx.params.id;
    const data = await getDetailForElement(idProduct);

    ctx.renderMain(editTemplate(submitHandler(onSubmit), data));

    async function onSubmit({ title, description, imageUrl, address, phone }) {
        if(title == '' || description == '' || imageUrl == '' || address == '' || phone == '') {
            return alert('all field is required');
        } 
        await editDetailForElement(idProduct, { title, description, imageUrl, address, phone });
        ctx.page.redirect('/catalog/' + idProduct);
    }
}