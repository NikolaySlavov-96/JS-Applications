import { getRequest, postRequest } from './requestrs.js';
import { postView } from './postView.js';
import { homeViewGetPost,homeViewPostPost } from './views.js';

const section = document.getElementById('homeView');

section.addEventListener('submit', btnType);
section.getElementsByClassName('topic-title')[0].addEventListener('click', checkTypeEv);

const urlPost = '/jsonstore/collections/myboard/posts';

export async function homeViewSection() {
    homeViewGetPost(await getRequest(urlPost));
    document.querySelector('main').replaceChildren(section);
}

async function btnType(ev) {
    ev.preventDefault();
    const parentForm = ev.target
    if(ev.submitter.innerHTML === 'Post') {
        const formData = Object.fromEntries(formEdit(parentForm));
        formData.currentData = new Date();
        homeViewPostPost(await postRequest(urlPost, formData))
    }
    parentForm.reset();
}

function formEdit(ev) {
    const formData = new FormData(ev)
    return formData
}

export function checkTypeEv(ev) {
    ev.preventDefault()

    if(ev.target.parentElement.tagName === 'A') {
        const elId = ev.target.parentElement.parentElement.getAttribute('id');

        postView(elId);
        section.remove()
    };
}