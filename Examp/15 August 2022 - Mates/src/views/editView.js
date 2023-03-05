import { html } from "../../node_modules/lit-html/lit-html.js";
import { editSpecificShoe, getSpecificShoe } from "../data/mate.js";
import { submitHandler } from "../until.js";


const editTemplate = (onSubmit, content) => html`
<section id="edit">
    <div class="form">
        <h2>Edit item</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="brand" id="shoe-brand" .value=${content.brand} placeholder="Brand" />
            <input type="text" name="model" id="shoe-model" .value=${content.model} placeholder="Model" />
            <input type="text" name="imageUrl" id="shoe-img" .value=${content.imageUrl} placeholder="Image url" />
            <input type="text" name="release" id="shoe-release" .value=${content.release} placeholder="Release date" />
            <input type="text" name="designer" id="shoe-designer" .value=${content.designer} placeholder="Designer" />
            <input type="text" name="value" id="shoe-value" .value=${content.value} placeholder="Value" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export async function editView(ctx) {
    const idShoe = ctx.params.id;
    const dataOpenShoe = await getSpecificShoe(idShoe)
    ctx.renderSection(editTemplate(submitHandler(onSubmit), dataOpenShoe));

    async function onSubmit({ brand, model, imageUrl, release, designer, value }) {
        //TO DO Validation

        if(brand == '' || model == '' || imageUrl == '' || release == '' || designer == '' || value == '' ) {
            return alert('all field is required')
        }

        const resultEdit = await editSpecificShoe(idShoe, { brand, model, imageUrl, release, designer, value });
        ctx.page.redirect('/dashboard/' + idShoe);
    }
}
