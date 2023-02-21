import { dellRequest, getRequest, postRequest } from "../api.js";
import { endPoints, checkSessionStorage, checkLikeBtn } from '../untils.js';

const section = document.getElementById('movie-example');
section.remove();

let ctx = null;
let idMovie = undefined;

export function showMovie(inCtx, inMovieId) {
    ctx = inCtx;
    ctx.renderDom(section);
    
    if(typeof inMovieId == 'object') {
        ctx.movieDetails(inMovieId);
        idMovie = inMovieId;
    } else {
        idMovie = inMovieId;
    }

    document.getElementById('movie-example').addEventListener('click', onBtn);
    movieDetailt()
}

async function movieDetailt() {
    const data = await getRequest(endPoints.movieRequest + '/' + idMovie);
    let like = await likeTrue()
    if(like.length !== 0) {
        const counterLike = await likeConunter();
        like = counterLike
    } else {
        like = false;
    }
    ctx.movieDetails(data, like);
}

async function likeTrue() {
    const user = checkSessionStorage();
    const like = getRequest(`/data/likes?where=movieId%3D%22${idMovie}%22%20and%20_ownerId%3D%22${user.id}%22`);
    return like
}

async function likeConunter() {
    const countet = getRequest(`/data/likes?where=movieId%3D%22${idMovie}%22&distinct=_ownerId&count`);
    return countet
}

const typeBtn = {
    'Like': btnLike,
    'Edit': btnEdit,
    'Delete': btnDelete,
}

function onBtn(ev) {
    ev.preventDefault()
    const event = ev.target;
    if(event.tagName == 'A') {
        const content = event.textContent;
        const btn = typeBtn[content];
        btn(event);
    }
}

async function btnLike(event) {
    const like = await postRequest(endPoints.addRevokeLike, {'movieId': idMovie});
    // event.remove()
    //call to add other button
}

async function btnEdit() {
    const data = await getRequest(endPoints.movieRequest + '/' + idMovie);
    ctx.goTo('editView', data);
}

function btnDelete() {
    dellRequest(endPoints.movieRequest + '/' + idMovie);
    ctx.goTo('homeView');
}