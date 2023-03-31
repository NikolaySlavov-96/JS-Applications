import { html, nothing } from "../../node_modules/lit-html/lit-html.js";
import { repeat } from "../../node_modules/lit-html/directives/repeat.js";
import { searchEngine } from "../data/search.js";
import { submitHandler } from "../until.js";

const cardResult = (content, user) => html`
<div class="card-box">
    <img src="${content.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${content.name}</p>
            <p class="artist">Artist: ${content.artist}</p>
            <p class="genre">Genre: ${content.genge}</p>
            <p class="price">Price: $${content.price}</p>
            <p class="date">Release Date: ${content.releaseDate}</p>
        </div>
        ${user ? html`
        <div class="btn-group">
            <a href="/catalog/${content._id}" id="details">Details</a>
        </div>` : nothing}
    </div>
</div>`;

const resultTemplate = (hasResult, data) => html`
<div id="search-result">
    ${hasResult ? html`
    <!-- Display a li with information about every post (if any)-->
    ${data.map(el => cardResult(el, data.user))}
` :
   html`<p class="no-result">No result.</p>`}
</div>`;

const searchTemplate = (hasInput, onSubmit, hasResult, data) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onSubmit} class="button-list">Search</button>
    </div>

    <h3>Results:</h3>
    ${hasInput ? resultTemplate(hasResult, data) : nothing};

</section>`;

export function searchView(ctx) {
    let hasInput = false;
    ctx.renderSection(searchTemplate(hasInput, onSubmit));

    async function onSubmit(ev) {
        ev.preventDefault()
        const fielt = ev.target.parentElement.querySelector('input').value;
        hasInput = true;
        let hasResult = false;
        const resultSeach = await searchEngine(fielt);

        if (resultSeach.length !== 0) {
            hasResult = true;
        }
        const user = ctx.user;
        if (user) {
            resultSeach.user = true;
        } else {
            resultSeach.user = false;
        }
        console.log(resultSeach)

        ctx.renderSection(searchTemplate(hasInput, submitHandler(onSubmit), hasResult, resultSeach));
    }
}