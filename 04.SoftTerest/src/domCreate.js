export function createDom() {
    return {
        createDashbord,
        createEmptyDashbord,
    }
}

function createDashbord(data) {
    const divF = createElemHTML('div');
    const divP = createElemHTML('div', 'card-body')
    divP.appendChild(createElemHTML('p', 'card-text', data.title));
    divF.appendChild(divP);
    divF.appendChild(createElemHTML('img', 'card-image', data.img))
    divF.appendChild(createElemHTML('a', 'btn', data._id))

    
    return divF
}

function createEmptyDashbord() {
    const h1 = createElemHTML('h1', '', 'No ideas yet! Be the first one :)');

    return h1;
}

function createElemHTML(type, classN, content) {
    const el = document.createElement(type);
    
    if(type == 'div' && classN == undefined) {
        el.classList.add('card')
        el.classList.add('overflow-hidden')
        el.classList.add('current-card')
        el.classList.add('details')
        el.style = 'width: 20rem; height: 18rem;';
    }

    if(classN !== undefined && classN !== '') {
        el.classList.add(classN);
    }

    if(content !== undefined && content !== '') {
        el.textContent = content;
    }
    
    if(type == 'img') {
        el.src = content
        el.alt = 'Card image cap'
    }

    if(type == 'a') {
        el.id = content;
        el.href = "#";
        el.textContent = 'Details';
    }

    return el;
}