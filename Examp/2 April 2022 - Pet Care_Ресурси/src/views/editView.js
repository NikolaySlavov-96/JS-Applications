import { editDetailForElement, getDetailForElement } from "../data/product.js";
import { html } from "../lib.js";
import { submitHandler } from "../utility.js";

const editTemplate = (onSubmit, data) => html`
<section id="editPage">
    <form @submit=${onSubmit} class="editForm">
        <img src="${data.image}">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" value="${data.name}">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" value="${data.breed}">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" value="${data.age}">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" value="${data.weight}g">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" value="${data.image}">
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
</section>`;

export async function editView(ctx) {
    const idProduct = ctx.params.id;
    const data = await getDetailForElement(idProduct);

    console.log(data)

    ctx.renderMain(editTemplate(submitHandler(onSubmit), data));

    async function onSubmit({ name, breed, age, weight, image }) {
        if (name == '' || breed == '' || age == '' || weight == '' || image == '') {
            return alert('all field is required');
        }
        await editDetailForElement(idProduct, { name, breed, age, weight, image });
        ctx.page.redirect('/catalog/' + idProduct);
    }
}