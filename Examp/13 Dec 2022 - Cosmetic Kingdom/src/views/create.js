import { html } from "../../node_modules/lit-html/lit-html.js";
import { submitHandlerForm } from "../until.js";
import { addProduct } from '../api/data.js';

const createTemplate = (onSubmit) => html`
<section id="create">
    <div class="form" @submit=${onSubmit}>
        <h2>Add Product</h2>
        <form class="create-form">
            <input type="text" name="name" id="name" placeholder="Product Name" />
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" />
            <input type="text" name="category" id="product-category" placeholder="Category" />
            <textarea id="product-description" name="description" placeholder="Description" rows="5"
                cols="50"></textarea>

            <input type="text" name="price" id="product-price" placeholder="Price" />

            <button type="submit">Add</button>
        </form>
    </div>
</section>`;

export function createProductView(ctx) {
    ctx.renderSection(createTemplate(submitHandlerForm(onSubmit)));

    async function onSubmit({name, imageUrl, category, description, price}) {
        if(name == '' || imageUrl == '' || category == '' || description == '' || price == ''){
            return alert('all field is required');
        }
        const product = await addProduct({name, imageUrl, category, description, price});
        ctx.page.redirect('/catalog');
    }
}