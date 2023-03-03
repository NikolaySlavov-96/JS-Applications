import { html } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getDatails, putFurniture } from '../data/dataF.js';
import { submitHandler } from '../until.js';

const createTemplateEdit = (submit, data, isValidForm) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Edit Furniture</h1>
        <p>Please fill all fields.</p>
    </div>
</div>
<form @submit=${submit}>
    <div class="row space-top">
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-make">Make</label>
                <input class="form-control ${isValidForm.hasMake}" id="new-make" type="text" name="make" .value=${data.make}>
            </div>
            <div class="form-group has-success">
                <label class="form-control-label" for="new-model">Model</label>
                <input class="form-control ${isValidForm.hasModel}" id="new-model" type="text" name="model" .value=${data.model}>
            </div>
            <div class="form-group has-danger">
                <label class="form-control-label" for="new-year">Year</label>
                <input class="form-control ${isValidForm.hasYear}" id="new-year" type="number" name="year" .value=${data.year}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-description">Description</label>
                <input class="form-control ${isValidForm.hasDescription}" id="new-description" type="text" name="description"
                    .value=${data.description}>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-group">
                <label class="form-control-label" for="new-price">Price</label>
                <input class="form-control ${isValidForm.hasPrice}" id="new-price" type="number" name="price" .value=${data.price}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-image">Image</label>
                <input class="form-control ${isValidForm.hasImg}" id="new-image" type="text" name="img" .value=${data.img}>
            </div>
            <div class="form-group">
                <label class="form-control-label" for="new-material">Material (optional)</label>
                <input class="form-control" id="new-material" type="text" name="material" .value=${data.material}>
            </div>
            <input type="submit" class="btn btn-info" value="Edit" />
        </div>
    </div>
</form>`;

export async function editTemplate(ctx) {
    const idProduct = ctx.params.id;
    const dataProduct = await getDatails(idProduct);
    ctx.render(createTemplateEdit(submitHandler(onSubmit), dataProduct, {}))

    async function onSubmit({make, model, year, description, price, img, material}) {
        year = Number(year);
        price = Number(price);

        const isValidForm = {
            hasMake: 'is-valid', 
            hasModel: 'is-valid', 
            hasYear: 'is-valid',
            hasDescription: 'is-valid', 
            hasPrice: 'is-valid', 
            hasImg: 'is-valid', 
        }
        
        let hasInCorrect = false;
        if(make.length < 4) {
            isValidForm.hasMake = 'is-invalid';
            hasInCorrect = true;
        }
        if(model.length < 4) {
            isValidForm.hasModel = 'is-invalid'
            hasInCorrect = true;
        }
        if(1950 > year || year > 2050) {
            isValidForm.hasYear = 'is-invalid'
            hasInCorrect = true;
        }
        if(description.length < 10) {
            isValidForm.hasDescription = 'is-invalid'
            hasInCorrect = true;
        }
        if(!price || price < 0) {
            isValidForm.hasPrice = 'is-invalid'
            hasInCorrect = true;
        }
        if(!img) {
            isValidForm.hasImg = 'is-invalid'
            hasInCorrect = true;
        }

        if(hasInCorrect) {
            return ctx.render(createTemplateEdit(submitHandler(onSubmit),dataProduct, isValidForm));
        }

        await putFurniture(idProduct, {make, model, year, description, price, img, material});
        ctx.page.redirect('/')
    }
}