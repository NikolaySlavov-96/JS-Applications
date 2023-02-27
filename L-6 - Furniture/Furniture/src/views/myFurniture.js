import { html } from '../../node_modules/lit-html/lit-html.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getMyFurniture } from '../data/dataF.js';

const myFurnitureCreate = (product) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>My Furniture</h1>
        <p>This is a list of your publications.</p>
    </div>
</div>
<div class="row space-top">
    ${repeat(product, el => el._id, cardProduct)}
</div>`;

const cardProduct = (data) => html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${data.img}" />
                <p>Description here</p>
                <footer>
                    <p>Price: <span>${data.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${data._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>
`;

export async function myFurnitureTemplate(ctx) {
    const id = ctx.user.id
    const data = await getMyFurniture(id)
    ctx.render(myFurnitureCreate(data));
}