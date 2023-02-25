import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { getDatails } from '../data/dataF.js';


const createTemplate = (detail, owner) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="/images/chair.jpg" />
            </div>
        </div>
    </div>
    <div class="col-md-4">
        <p>Make: <span>${detail.make}</span></p>
        <p>Model: <span>${detail.model}</span></p>
        <p>Year: <span>${detail.year}</span></p>
        <p>Description: <span>${detail.description}</span></p>
        <p>Price: <span>${detail.price}</span></p>
        <p>Material: <span>${detail.material}</span></p>
        ${owner ? html`
        <div>
            <a href=”#” class="btn btn-info">Edit</a>
            <a href=”#” class="btn btn-red">Delete</a>
        </div>
        ` : nothing}
    </div>
</div>`;

export async function detailTemplate(ctx) {
    const id = ctx.path;
    const detailView = await getDatails(id);
    const idOwner = detailView._ownerId;
    const idUser = ctx.user.id
    let owner = false;
    if(idOwner == idUser) {
        owner = true;
    }
    ctx.render(createTemplate(detailView, owner))
}

//Object { _ownerId: "35c62d76-8152-4626-8712-eeb96381bea8", make: "Table", model: "Swedish", year: 2015, description: "Medium table", price: 235, img: "./images/table.png", material: "Hardwood", _createdOn: 1615545143015, _id: "53d4dbf5-7f41-47ba-b485-43eccb91cb95" }