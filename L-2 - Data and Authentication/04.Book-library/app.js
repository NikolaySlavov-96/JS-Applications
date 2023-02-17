
document.getElementById('loadBooks').addEventListener('click', onLoadBook);


const storeBook = document.querySelector(`table tbody`);
const formStyle = document.querySelector('form');
const bodyFund = document.querySelector('body');
const editFormD = document.createElement('form');
formStyle.querySelector('button').addEventListener('click', onSubmit);
storeBook.addEventListener('click', onHubBtn);
async function onLoadBook(ev) {
    ev.preventDefault();

    storeBook.innerHTML = ''
    try {
        const resposne = await fetch(`http://localhost:3030/jsonstore/collections/books`);

        if(resposne.ok == false) {
            const error = await resposne.json();
            throw new Error(error.message);
        }

        const dataResponse = await resposne.json();
        const lineBook = Object.entries(dataResponse);

        for (const book of lineBook) {
            storeBook.appendChild(createBook(book[0], book[1]))
            // console.log(book[1])
        }

    } catch(err) {
        // alert(err.message)
    }
}

function onSubmit(ev) {
    ev.preventDefault();

    const titleNew = formStyle.querySelector("input[name='title']").value;
    const autorNew = formStyle.querySelector("input[name='author']").value;

    if(titleNew !== '' && autorNew !== '') {
        submitPost(titleNew, autorNew);
    }
}

async function submitPost(titleNew, autorNew) {
    try {
        const resposne = await fetch(`http://localhost:3030/jsonstore/collections/books`, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title: titleNew, author: autorNew})
        })

        if(resposne.ok == false) {
            const error = await resposne.json();
            throw new Error(error.message);
        }

        const data = await resposne.json();
        storeBook.appendChild(createBook(data._id, data));
        // console.log(data);
    } catch(err) {

    }
}

function createBook(id, book) {
    const tr = createEl('tr', '', id);
    tr.appendChild(createEl('td', book.title));
    tr.appendChild(createEl('td', book.author));
    const tdBtn = createEl('td');
    tdBtn.appendChild(createEl('button', 'Edit'))
    tdBtn.appendChild(createEl('button', 'Delete'))
    tr.appendChild(tdBtn);
    return tr;
}

function createEl(type, content, id) {
    const el = document.createElement(type);

    if(id !== '' && id !== undefined) {
        el.setAttribute('id', id);
    }

    if(content !== '' && content !== undefined) {
        el.textContent = content;
    }

    if(type === 'button' && content === 'Edit') {
        el.addEventListener('click', onEdit);
    }

    if(type === 'button' && content === 'Delete') {
        el.addEventListener('click', onDelete);
    }
    return el;
}

// function onHubBtn(ev) {
//     if(ev.target.tagName === 'BUTTON'){
//         if(ev.target.textContent === 'Edit'){
//             onEdit(ev);
//         }
//     }
// }

function onEdit(ev) {
    formStyle.style.display = 'none'
    editFormD.innerHTML = `<h3>Edit FORM</h3>
<label>TITLE</label>
<input type="text" name="title" placeholder="">
<label>AUTHOR</label>
<input type="text" name="author" placeholder="">
<button>Save</button>`
    bodyFund.appendChild(editFormD);
    editFormD.querySelector('button').addEventListener('click', onSave);
    const idType = ev.target.parentElement.parentElement.getAttribute('id');
    editFetchGet(idType);

    function onSave(ev) {
        ev.preventDefault()
        
        const titleNew = editFormD.querySelector("input[name='title']").value;
        const autorNew = editFormD.querySelector("input[name='author']").value;
        editFetchPut(idType, titleNew, autorNew)

        editFormD.remove();
        formStyle.style.display = 'block'
    }
}


function onDelete(ev) {
    const parent = ev.target.parentElement.parentElement;
    fetch(`http://localhost:3030/jsonstore/collections/books/${parent.getAttribute('id')}`, {
        method: 'delete',
    });
    parent.remove();
}

async function editFetchGet(id) {
    const respons = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`);

    if(respons.ok == false) {
        const error = respons.json();
        throw new Error(error.message);
    }

    const data = await respons.json();
    // console.log(editFormD.querySelector("input[name='title']"))
    editFormD.querySelector("input[name='title']").value = data.title;
    editFormD.querySelector("input[name='author']").value = data.author;
}


async function editFetchPut(id, titleNew, autorNew) {

    try {
        const response = await fetch(`http://localhost:3030/jsonstore/collections/books/${id}`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                author: autorNew,
                title: titleNew,
            })
        })

        if(response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }
    } catch(err) {
        // 
    }
}