const section = document.getElementById('home-page');
document.getElementById('add-movie-button').addEventListener('click', addMovie);
section.remove();

let ctx = null;
export function showHome(inCtx) {
    ctx = inCtx;
    ctx.renderDom(section);
}

function createMovieList(ev) {
    const movieList = section.getElementById('movies-list');
}

function addMovie(ev) {
    ev.preventDefault();
    ctx.goTo('addMovieView')
}