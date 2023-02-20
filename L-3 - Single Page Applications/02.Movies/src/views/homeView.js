import { getRequest } from "../api.js";
import { endPoints } from "../untils.js";

const section = document.getElementById('home-page');
document.getElementById('add-movie-button').addEventListener('click', addMovie);
document.getElementById('movies-list').addEventListener('click', onMovie)
section.remove();

let ctx = null;
export function showHome(inCtx) {
    ctx = inCtx;
    ctx.renderDom(section);
    createMovieList()
}

async function createMovieList() {
    const dataResponse = await getRequest(endPoints.movieRequest);
    ctx.addMovieToDom(dataResponse);
}

function addMovie(ev) {
    ev.preventDefault();
    ctx.goTo('addMovieView')
}

async function onMovie(ev) {
    ev.preventDefault()
    if(ev.target.tagName == 'A') {
        ctx.goTo('movie-example');
        
        //curent situation .. dont work after importh html structure
        const id = ev.target.parentElement.id
        const data = await getRequest(endPoints.movieRequest + '/' + id);
        ctx.movieDetails(data)
    }
}