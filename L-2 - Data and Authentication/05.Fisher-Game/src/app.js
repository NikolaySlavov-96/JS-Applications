window.addEventListener('DOMContentLoaded', onLoadHTML);
document.getElementById(`logout`).addEventListener('click', onLogout);
const formCreateCatch = document.getElementById('addForm');
formCreateCatch.addEventListener('submit', onCreateData);
const loginEmail = document.querySelector('p.email span')
// document.querySelector('.load').addEventListener('click', () => {
//     createResponse()
// });

const catchest = document.getElementById(`catches`);
catchest.addEventListener('click', onCheckType);
const userDatas = JSON.parse(sessionStorage.getItem('userData'));

function onLoadHTML() {
    // const userDatas = JSON.parse(sessionStorage.getItem('userData'));
    
    if(userDatas) {
        document.getElementById(`guest`).style.display = 'none';
        loginEmail.textContent = userDatas.email;
        document.querySelector('.add').disabled = false;
    } else {
        document.getElementById(`guest`).style.display = 'inline-block';
        document.getElementById(`user`).style.display = 'none';
    }

    createResponse()
}

function onCreateData(ev) {
    ev.preventDefault();

    const formData = new FormData(ev.target);
    const data = Object.fromEntries(formData);

    //validation 
    if(data.name !== '' && data.weight !== '' && data.species !== '' && data.location !== '' && data.bait !== '' && data.captureTime !== '') {
        responseNewCatch(data);
    }
}

async function responseNewCatch(dataIn) {
    try {
        const response = await fetch('http://localhost:3030/data/catches', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userDatas.accessToken,
            },
            body: JSON.stringify(dataIn)
        });

        if(response.ok == false) {
            const error = await response.json();
            //
        }

        const data = await response.json();
        catchest.appendChild(createCatches(data));

    } catch(err) {
        //
    }
}

async function createResponse() {

    
    try {
        const response = await fetch('http://localhost:3030/data/catches');
        
        if(response.ok == false) {
            const error = await response.json();
            //
        }
        
        const data = await response.json();
        for (const catc of data) {
            let btnsDis = true;
            if(userDatas !== null && userDatas.id == catc._ownerId) {
                btnsDis = false;
            }
            catchest.appendChild(createCatches(catc, btnsDis));
        }
        
    } catch(err) {
        //
    }
    
}

function createCatches(dataIn, btn) {
    const divPar = createElements('div', 'catch');
    divPar.appendChild(createElements('label', '', 'Angler'));
    divPar.appendChild(createElements('input', 'angler', '', 'text', dataIn.angler));
    divPar.appendChild(createElements('label', '', 'Weight'));
    divPar.appendChild(createElements('input', 'weight', '', 'text', dataIn.weight));
    divPar.appendChild(createElements('label', '', 'Species'));
    divPar.appendChild(createElements('input', 'species', '', 'text', dataIn.species));
    divPar.appendChild(createElements('label', '', 'Location'));
    divPar.appendChild(createElements('input', 'location', '', 'text', dataIn.location));
    divPar.appendChild(createElements('label', '', 'Bait'));
    divPar.appendChild(createElements('input', 'bait', '', 'text', dataIn.bait));
    divPar.appendChild(createElements('label', '', 'Capture Time'));
    divPar.appendChild(createElements('input', 'captureTime', '', 'number', dataIn.captureTime));
    divPar.appendChild(createElements('button', 'update', 'Update', '', dataIn._id));
    divPar.appendChild(createElements('button', 'delete', 'Delete', '', dataIn._id));
    if(btn) {
        divPar.querySelectorAll('button').forEach(bt => bt.disabled='true')
    }
    return divPar;
}

function createElements(type, classN, content, typeInput, valueIn) {

    const elem = document.createElement(type);

    if(type == 'input') {
        elem.type = typeInput;
        elem.value = valueIn
    }

    if(type == 'button') {
        elem.id = valueIn;
    }

    if(classN !== undefined && classN !== '') {
        elem.classList.add(classN);
    }

    if(content !== undefined && content !== '') {
        elem.textContent = content;
    }

    return elem;
}

function onCheckType(ev) {
    ev.preventDefault();

    const btnTarget = ev.target
    if(ev.target.tagName === 'BUTTON') {
        const btnId = btnTarget.getAttribute('id');

        if(btnTarget.textContent === 'Update') {
            updateInforDiv(btnTarget, btnId);
        }
        
        if(btnTarget.textContent === 'Delete') {
            fetch(`http://localhost:3030/data/catches/${btnId}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': userDatas.accessToken,
                }
            })
            btnTarget.parentElement.remove();
        }
    }
}

async function updateInforDiv(target, id) {
    const parentDiv = target.parentElement;
    const elem = parentDiv.querySelectorAll('input');
    
    try {
        const response = await fetch(`http://localhost:3030/data/catches/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'X-Authorization': userDatas.accessToken,
            },
            body: JSON.stringify({
                'angler': elem[0].value,
                'weight': elem[1].value,
                'species': elem[2].value,
                'location': elem[3].value,
                'bait': elem[4].value,
                'captureTime': elem[5].value
            })
        });

        if(response.ok == false) {
            const error = await response.json();
            //
        }

        const data = await response.json();

    } catch(err) {
        //
    }

    //angler: "John Does", weight: 554, species: "Atlantic Blue Marlin", location: "Buenos Aires, Argentina", bait: "trolled pink", captureTime: 120
}


async function onLogout() {
    const userD = JSON.parse(sessionStorage.getItem('userData'));

    fetch('http://localhost:3030/users/logout', {
        method: 'get',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': userD.accessToken,
        }
    })
    
    sessionStorage.removeItem("userData")

    window.location = './index.html'
}