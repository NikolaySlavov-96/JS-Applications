import { getAllOffers } from "../api/data.js";
import { html, repeat } from "../lib.js";

const catalogTemplate = (isData, allOfest) => html`
<section id="dashboard">
    ${isData ? html`
    <h2>Job Offers</h2>
    ${repeat(allOfest, e => e._id, oferCardTemplate)}
    ` : html`
    <h2>No offers yet.</h2>
    `}
</section>`;

const oferCardTemplate = (content) => html`
    <div class="offer">
        <img src="${content.imageUrl}" alt="example1" />
        <p>
            <strong>Title: </strong><span class="title">${content.title}</span>
        </p>
        <p><strong>Salary:</strong><span class="salary">${content.salary}</span></p>
        <a class="details-btn" href="/catalog/${content._id}">Details</a>
    </div>
`

export async function catalogView(ctx) {
    const allOfest = await getAllOffers();
    let isData = true;

    if (allOfest.length == 0) {
        isData = false;
    }
    ctx.renderSection(catalogTemplate(isData, allOfest));
}