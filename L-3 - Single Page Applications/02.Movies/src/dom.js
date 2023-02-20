import { checkUserType } from './untils.js';

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

export function movieDetails(id) {
    const users = checkUserType(id._ownerId);
    const divL = document.createElement('div');
    divL.classList.add('container');
    const divRow = document.createElement('div');
    divRow.classList.add('row');
    divRow.classList.add('bg-light');
    divRow.classList.add('text-dark');
    divRow.innerHTML = `
    <h1>Movie title: ${id.title}</h1>
    <div class="col-md-8">
      <img
        class="img-thumbnail"
        src="${id.img}"
        alt="Movie"
      />
    </div>`

    if(users == true) {
        const div = document.createElement('div');
        div.id = id._id;
        div.classList.add('col-md-4')
        div.classList.add('text-center')
        div.innerHTML = `
        <h3 class="my-3">Movie Description</h3>
        <p>
            ${id.description}
        </p>
        <a class="btn btn-danger" href="#">Delete</a>
        <a class="btn btn-warning" href="#">Edit</a>
        `
        divRow.appendChild(div);
    } else {
      const div = document.createElement('div');
        div.id = id._id;
        div.classList.add('col-md-4')
        div.classList.add('text-center')
        div.innerHTML = `
        <h3 class="my-3">Movie Description</h3>
        <p>
            ${id.description}
        </p>`
      if(true) {
        const btn = document.createElement('a');
        btn.id = 'likeBtn';
        btn.classList.add('btn')
        btn.classList.add('btn-primary')
        btn.href ="#";
        btn.textContent = 'Like'
        div.appendChild(btn);
      } else {
        div.appendChild(spanBtn());
      }
      divRow.appendChild(div);
    }

    divL.appendChild(divRow);
    document.getElementById('movie-example').replaceChildren(divL);
}

function spanBtn() {
  const span = document.createElement('span');
        span.id = 'viewLikes';
        span.classList.add('enrolled-span');
        span.textContent = 'Liked 1';
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