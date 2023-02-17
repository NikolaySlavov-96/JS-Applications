window.addEventListener('load', solution)
const mainIn = document.getElementById('main');

mainIn.addEventListener('click', more);

async function solution() {
    try {
        const request = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');

        if(request.status !== 200) {
            throw new Error(``);
        }
        
        const data = await request.json();
        const result = Object.values(data);

        for (const add of result) {
            createHTML(add)
        }
    } catch(err) {
        // console.log(err.message);
    }
}

function createHTML(add) {

    const elem = createElem('div', 'accordion');
    const divF = createElem('div', 'head');
    divF.appendChild(createElem('span', '','' , add.title));
    divF.appendChild(createElem('button', 'button', add._id, 'More'));
    elem.appendChild(divF);
    const divExtra = createElem('div', 'extra');
    elem.appendChild(divExtra);

    mainIn.appendChild(elem)
}

function createElem(type, classN, idE, content) {
    const el = document.createElement(type);

    if(classN !== undefined && classN !== '') {
        el.classList.add(classN);
    }

    if(idE !== undefined && idE !== '') {
        el.id = idE;
    }

    if(content !== undefined && content !== '') {
        el.textContent = content;
    }

    return el;
}

function more(ev) {

    if(ev.target.tagName === 'BUTTON') {
        
        const parent = ev.target.parentElement.parentElement;
        const result = parent.querySelector('.extra')
        result.innerHTML = '';
        
        fetchFull(ev.target.id, result);
        
        if(ev.target.textContent == 'More') {
            result.style.display = 'block';
            ev.target.textContent = 'Less'
        } else {
            result.style.display = 'none';
            ev.target.textContent = 'More'
        }
    }

}

async function fetchFull(id, result) {

    try {
        const response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${id}`);
        
        if(response.status !== 200) {
            throw new Error(``);
        }
        const data = await response.json();
    
        result.appendChild(createElem('p' ,'' ,'' , data.content));
    } catch(err) {
        // console.log(err.message);
    }
}