import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import { until } from '../../node_modules/lit-html/directives/until.js';
import { cache } from '../../node_modules/lit-html/directives/cache.js';
import { getDatails, deleteFurniture } from '../data/dataF.js';
import { commentTemplate } from './commends.js';

const isOwnerFunc = (id, owner, deleteFn) => html`${owner ? html`
<div>
    <a href="/edit/${id}" class="btn btn-info">Edit</a>
    <a @click=${deleteFn} href="javascript:void(0)" class="btn btn-red">Delete</a>
</div>
` : nothing}`

const createTemplate = (detail, owner, deleteFn, commentsSection) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Furniture Details</h1>
    </div>
</div>
<div class="row space-top">
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="/images/${detail.img.split('/')[2]}" />
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
        ${isOwnerFunc(detail._id, owner, deleteFn)}
    </div>
    ${commentsSection}
</div>`;

export async function detailTemplate(ctx) {
    // const id = ctx.params.id;
    // const detailView = await getDatails(id);
    // const idOwner = detailView._ownerId;
    // const idUser = ctx?.user?.id
    // let owner = false;
    // if (idOwner == idUser) {
    //     owner = true;
    // }

    // ctx.render(createTemplate(detailView, owner, onDelete))

    // async function onDelete() {
    //     await deleteFurniture(id);
    //     ctx.page.redirect('/')
    // }

    ctx.render(until(wraperDetails(ctx), 'Loading details ...'))
}

async function wraperDetails(ctx) {
    const id = ctx.params.id;
    const detailView = await getDatails(id);
    const idOwner = detailView._ownerId;
    const idUser = ctx?.user?.id
    let owner = false;

    if (idOwner == idUser) {
        owner = true;
    }

    async function onDelete() {
        await deleteFurniture(id);
        ctx.page.redirect('/')
    }

    return cache(createTemplate(detailView, owner, onDelete, commentTemplate(ctx)));
}