import { editOffes, getOfferst } from "../api/data.js";
import { html } from "../lib.js";
import { submitHandler } from "../utility.js";

const editTemplate = (onSubmit, data) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Offer</h2>
        <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="title" id="job-title" .value=${data.title} placeholder="Title" />
            <input type="text" name="imageUrl" id="job-logo" .value=${data.imageUrl} placeholder="Company logo url" />
            <input type="text" name="category" id="job-category" .value=${data.category} placeholder="Category" />
            <textarea id="job-description" name="description" .value=${data.description} placeholder="Description" rows="4" cols="50"></textarea>
            <textarea id="job-requirements" name="requirements" .value=${data.requirements} placeholder="Requirements" rows="4"
                cols="50"></textarea>
            <input type="text" name="salary" id="job-salary" .value=${data.salary} placeholder="Salary" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export async function editView(ctx) {
    const idOffes = ctx.params.id;
    const getDataoffers = await getOfferst(idOffes);

    ctx.renderSection(editTemplate(submitHandler(onSubmit), getDataoffers));

    async function onSubmit({ title, imageUrl, category, description, requirements, salary }) {
        //TO Do Validation
        if (title == '' || imageUrl == '' || category == '' || description == '' || requirements == '' || salary == '') {
            return alert('all field is required')
        }

        const resultEdit = await editOffes(idOffes, { title, imageUrl, category, description, requirements, salary });
        ctx.page.redirect('/catalog/' + idOffes);
    }
}