import {contentHomeViewGetPost, contentPostViewTitle, contentPostViewComment, contentPostViewUserCommen} from './createConteiner.js';

const addComment = document.querySelector('.topic-title');
const addPostViewTitle = document.getElementsByClassName('theme-title')[0];
const addPostViewComment = document.getElementsByClassName(`comment`)[0];

export function homeViewGetPost(resposne) {
    addComment.innerHTML = '';
    const data = Object.values(resposne)
    for (const post of data) {
        addComment.appendChild(contentHomeViewGetPost(post));
    }
}

export function homeViewPostPost(response) {
    addComment.appendChild(contentHomeViewGetPost(response))
}

export function postViewTitle(resposne) {
    addPostViewTitle.replaceChildren(contentPostViewTitle(resposne));
}

let id;
export function postViewComment(resposne) {
    id = resposne._id;
    addPostViewComment.replaceChildren(contentPostViewComment(resposne));
}

export function postViewUserNewCommen(resposne) {
    addPostViewComment.appendChild(contentPostViewUserCommen(resposne));
}

export function postViewUserComments(respose) {
    const dataArr = Object.values(respose)
    const comment = dataArr.filter(c => c.postId === id);
    for (const post of comment) {
        addPostViewComment.appendChild(contentPostViewUserCommen(post));
    }
}