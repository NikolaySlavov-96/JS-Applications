import { getRequest, postRequest } from './requestrs.js';
import { postViewTitle, postViewComment, postViewUserNewCommen, postViewUserComments } from './views.js'

const sectionPost = document.getElementById('postView');
sectionPost.getElementsByClassName(`answer-comment`)[0].addEventListener('submit', onFormData);
sectionPost.remove();

const urlPost = '/jsonstore/collections/myboard/posts/';
const urlComment = `/jsonstore/collections/myboard/comments`;
let idFromRequest;

export async function postView(url) {
    idFromRequest = url;
    const urlId = urlPost + url
    postViewTitle(await getRequest(urlId));
    postViewComment(await getRequest(urlId));
    postViewUserComments(await getRequest(urlComment));
    document.querySelector('main').replaceChildren(sectionPost);
}

async function onFormData(ev) {
    ev.preventDefault()

    const parentForm = ev.target
    const formData = new FormData(parentForm);
    const data = Object.fromEntries(formData);
    data.postId = idFromRequest;
    data.currentData = new Date();
    postViewUserNewCommen(await postRequest(urlComment, data));

    parentForm.reset();
}