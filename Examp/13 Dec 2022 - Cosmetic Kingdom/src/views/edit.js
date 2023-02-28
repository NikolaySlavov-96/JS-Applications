import { html } from "../../node_modules/lit-html/lit-html.js";
import { getSpecificProduct, editProduct } from '../api/data.js';
import { submitHandlerForm } from "../until.js";

const editTemplate = (onSubmit, dataProduct) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Product</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="name" id="name" placeholder="Product Name" .value=${dataProduct.name}>
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" .value=${dataProduct.imageUrl}>
            <input type="text" name="category" id="product-category" placeholder="Category" .value=${dataProduct.category}>
            <textarea id="product-description" name="description" placeholder="Description" rows="5"
                cols="50" .value=${dataProduct.description}></textarea>

            <input type="text" name="price" id="product-price" placeholder="Price" .value=${dataProduct.price}>
            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export async function editProcutView(ctx) {
    const idProduct = ctx.params.id;
    const dataProduct = await getSpecificProduct(idProduct);
    ctx.renderSection(editTemplate(submitHandlerForm(onSubmit), dataProduct))

    async function onSubmit({name, imageUrl, category, description, price}) {
        //TO DO Validatiomn
        if(name == '' || imageUrl == '' || category == '' || description == '' || price == ''){
            return alert('all field is required');
        }

        const updateProduct = await editProduct(idProduct, {name, imageUrl, category, description, price});
        ctx.page.redirect('/detail/' + idProduct)
    }
}