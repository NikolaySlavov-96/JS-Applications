import { html, render } from './node_modules/lit-html/lit-html.js';
import { getAllBooks, postNewBook, getOneBook, putOneBook } from './data/data.js';
import { tableRow } from './views/book.js';
import { addFormTemplate } from './views/addForm.js';
import { editFormTemplate } from './views/editForm.js';


document.getElementById('loadBooks').addEventListener('click', onLoadAllBook);
const rootElement = document.querySelector('table tbody');
const rootBody = document.querySelector('body');

async function onLoadAllBook(ev) {
    ev.preventDefault();
    reLoad()
}

async function reLoad() {
    const allBooks = await getAllBooks();
    const convertToArr = Object.entries(allBooks);
    const resultCreate = []
    for (const line of convertToArr) {
        resultCreate.push(tableRow(line, onEdint))
    }
    renderAllElement(resultCreate)
    addForm();
}

function renderAllElement(dataEl) {
    render(dataEl,rootElement);
}

function addForm() {
    render(addFormTemplate(onSubmitAdd), rootBody);
}

async function onEdint(ev) {
    ev.preventDefault();
    const idElement = ev.target.parentElement.parentElement.id
    const dataBook = await getOneBook(idElement);
    render(editFormTemplate(onSubmitEdit, idElement, dataBook), rootBody);
}

async function onSubmitAdd(ev) {
    ev.preventDefault();
    const formDate = new FormData(ev.target);
    const data = Object.fromEntries(formDate);
    if(data.title == '' || data.author == '') {
        alert('is not empty field');
        return
    }
    await postNewBook(data.author, data.title);
    ev.target.reset();
    reLoad()
}

async function onSubmitEdit(ev) {
    ev.preventDefault();
    const formDate = new FormData(ev.target);
    const data = Object.fromEntries(formDate);
    await putOneBook(data.author, data.title, data.id);
    reLoad()
}
