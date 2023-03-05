import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { repeat } from "../../node_modules/lit-html/directives/repeat.js";
import { searchEngine } from "../data/search.js";
import { submitHandler } from "../until.js";

const cardResult = (content) => html`
<li class="card">
    <img src="${content.imageUrl}" alt="travis" />
    <p>
        <strong>Brand: </strong><span class="brand">${content.brand}</span>
    </p>
    <p>
        <strong>Model: </strong><span class="model">${content.model}</span>
    </p>
    <p><strong>Value:</strong><span class="value">${content.value}</span>$</p>
    <a class="details-btn" href="/dashboard/${content._id}">Details</a>
</li>`

const resultTemplate = (hasResult, data) => html`
<div id="search-container">
    ${hasResult ? html`
    <ul class="card-wrapper">
        <!-- Display a li with information about every post (if any)-->
        ${repeat(data, d => d._id, cardResult)}
    </ul>
    ` :
     html`<h2>There are no results found.</h2>`}
</div>
`

const searchTemplate = (hasInput, onSubmit, hasResult, data) => html`
<section id="search">
    <h2>Search by Brand</h2>

    <form @submit=${onSubmit} class="search-wrapper cf">
        <input id="#search-input" type="text" name="search" placeholder="Search here..." required />
        <button type="submit">Search</button>
    </form>

    <h3>Results:</h3>
    ${hasInput ? resultTemplate(hasResult, data) : nothing};

</section>`;

export function searchView(ctx) {
    let hasInput = false;
    ctx.renderSection(searchTemplate(hasInput, submitHandler(onSubmit)));

    async function onSubmit(dataIn) {
        hasInput = true;
        let hasResult = false;
        const inputField = dataIn.search
        const resultSeach = await searchEngine(inputField);

        if (resultSeach.length !== 0) {
            hasResult = true;
        }
        const user = ctx.user;

        ctx.renderSection(searchTemplate(hasInput, submitHandler(onSubmit), hasResult, resultSeach));
    }
}