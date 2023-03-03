import { html } from '../../node_modules/lit-html/lit-html.js';
import { until } from '../../node_modules/lit-html/directives/until.js';
import { repeat } from '../../node_modules/lit-html/directives/repeat.js';
import { getAllFurnitureSearchPage } from '../data/dataF.js';
import { submitHandler } from '../until.js';

const dashbordView = (data, search, pager) => html`
<div class="row space-top">
    <div class="col-md-12">
        <h1>Welcome to Furniture System</h1>
        <p>Select furniture from the catalog to view details.</p>
        ${search}
        ${pager}
    </div>
</div>
<div class="row space-top">
    ${repeat(data, el => el._id, productCards)}
</div>`;

function productCards(el) {
    return html`
    <div class="col-md-4">
        <div class="card text-white bg-primary">
            <div class="card-body">
                <img src="${el.img}" />
                <p>${el.description}</p>
                <footer>
                    <p>Price: <span>${el.price} $</span></p>
                </footer>
                <div>
                    <a href="/details/${el._id}" class="btn btn-info">Details</a>
                </div>
            </div>
        </div>
    </div>
    `;
}

export async function dashbordTemplate(ctx) {
    // const data = await getAllFurniture()
    // ctx.render(dashbordView(data, serchTemplate(submitHandler(onSubmit))));
    
    ctx.render(until(catalogWraper(ctx), 'Loading ... ')); // using until befor render product
}

async function catalogWraper(ctx) {
    const search = ctx.query.search || '';
    const page = Number(ctx.query.page) || 1;
    const { data, pages } = await getAllFurnitureSearchPage(search, page);
    return dashbordView(
        data, 
        serchTemplate(search, submitHandler(onSubmit)),
        pagerTemplate(page, pages)
    )

    function onSubmit(dataIn) {
        if(dataIn.search !== '') {
            ctx.page.redirect('?search=' + dataIn.search)
        } else {
            ctx.page.redirect('/details');
        }
    }
}


// --- ADD Serch Template --- 

const serchTemplate = (search, onSubmit) => html`
<form @submit=${onSubmit}>
    <label> Search:<input type="text" name="search" .value=${search}></label>
    <input type="submit" value="Search">
</form>`;

// --- ADD pager Template --- 

const pagerTemplate = (page, pages) => html`
<div>
    ${page > 1 ? html`<a href="?page=${page - 1}">&lt; Prev</a>` : html`<a>&lt; Prev</a>`}
    <span> Page ${page}</span>
    ${page < pages ? html`<a href="?page=${page + 1}">Next &gt;</a>` : html`<a>Next &gt;</a>`}
</div>`;