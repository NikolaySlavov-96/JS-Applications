import { checkUserType, checkLikeBtn } from './untils.js';

export function renderDom(section) {
    document.getElementById('currentView').replaceChildren(section);
}

export function addMovieToDom(data) {
    const movieList = document.getElementById('movies-list');

    //add other information after response from softuni;
    const fragment = document.createDocumentFragment();
    const html = data.map(ob => fragment.appendChild(createEl(ob)));
    movieList.replaceChildren(fragment);
}

export function movieDetails(id, like) {
    const users = checkUserType(id._ownerId);
    const divL = document.createElement('div');
    divL.classList.add('container');
    divL.innerHTML = `
    <div class="row bg-light text-dark">
    <h1>Movie title: ${id.title}</h1>

    <div class="col-md-8">
      <img
        class="img-thumbnail"
        src="${id.img}"
        alt="Movie"
      />
    </div>
    <div class="col-md-4 text-center">
      <h3 class="my-3">Movie Description</h3>
      <p>
      ${id.description}
      </p>
      
    </div>
  </div>`
    const otherBtn = divL.querySelector('.text-center');
    if(users == true) {
        otherBtn.appendChild(createBtnA('a', 'btn', 'btn-danger', 'Delete'))
        otherBtn.appendChild(createBtnA('a', 'btn', 'btn-warning', 'Edit'))
      } else {
        if(like) {
          otherBtn.appendChild(spanBtn(like));
        } else {
          otherBtn.appendChild(createBtnA('a', 'btn', 'btn-primary', 'Like'))
      }
    }

    document.getElementById('movie-example').replaceChildren(divL);
}

function spanBtn(like) {
  const span = document.createElement('span');
        span.id = 'viewLikes';
        span.classList.add('enrolled-span');
        span.textContent = `Liked ${like}`;
    return span;
}

function createEl(data) {
    //Object { _ownerId: "847ec027-f659-4086-8032-5173e2f9c93a", title: "Black Widow", description: "Natasha Romanoff aka Black Widow confronts the darker parts of her ledger when a dangerous conspiracy with ties to her past arises. Comes on the screens 2020.", img: "https://miro.medium.com/max/735/1*akkAa2CcbKqHsvqVusF3-w.jpeg", _createdOn: 1614935055353, _id: "1240549d-f0e0-497e-ab99-eb8f703713d7" }
    const div = document.createElement('div');
    div.textContent = data.title;
    div.id = data._id;
    const ancar = document.createElement('a');
    ancar.href ="#";
    ancar.textContent = 'Movie'
    div.appendChild(ancar)
    return div
}

function createBtnA(type, classN, classN2, content) {
  const a = document.createElement(type);
  a.classList.add(classN);
  a.classList.add(classN2);
  a.href = '#';
  a.textContent = content;
  return a
}