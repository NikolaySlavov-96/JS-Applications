import { dellRequest, getRequest } from "../api.js";
import { endPoints } from "../config.js";
import { checkSessionStorage } from "../until.js";

const section = document.getElementById('detailView');
section.remove();

let ctx = null;
let idDetail = undefined;
export async function detailSection(inCtx, dataFil) {
    ctx = inCtx;
    idDetail = dataFil;
    ctx.renderDom(section);
    const ideaOwner = await getRequest(endPoints.ideaCreate + '/' + dataFil);
    const logedUser = checkSessionStorage();
    section.innerHTML = `
    <img class="det-img" src="${ideaOwner.img}" />
    <div class="desc">
        <h2 class="display-5">${ideaOwner.title}</h2>
        <p class="infoType">Description:</p>
        <p class="idea-description">${ideaOwner.description}</p>
    </div>
    `;
    if(ideaOwner._ownerId == logedUser.id) {
        const dom = ctx.createDom();
        section.appendChild(dom.createButton());
    }
}

section.addEventListener('click', onDelete);

async function onDelete(ev) {
    ev.preventDefault();
    await dellRequest(endPoints.ideaCreate + '/' + idDetail);
    ctx.goTo('/dashbord');
}

