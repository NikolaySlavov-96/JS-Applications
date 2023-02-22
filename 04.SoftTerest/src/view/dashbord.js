import { getRequest } from "../api.js";
import { endPoints } from "../config.js";

const section = document.getElementById('dashboard-holder');
section.remove();

let ctx = null;
export function dashbordSection(inCtx) {
    ctx = inCtx
    ctx.renderDom(section);
    checkView();
}


async function checkView() {
    const data = await getRequest(endPoints.dashboard);
    const createDom = ctx.createDom();
    section.innerHTML = '';
    if(data.length !== 0) {
        data.map(v => section.appendChild(createDom.createDashbord(v)));
    } else {
        section.appendChild(createDom.createEmptyDashbord())
    }

    section.addEventListener('click', onDetails);
}

function onDetails(ev) {
    ev.preventDefault();
    if(ev.target.tagName == 'A') {
        ctx.goTo('/detailView');
        //logic view date
    }
}