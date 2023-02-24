import * as api from './request.js';

const endPoints = {
    'getAllBooks': 'jsonstore/collections/books',
    'getBook': 'jsonstore/collections/books/',
    'editBook': 'jsonstore/collections/books/'
}

export function getAllBooks() {
    return api.getRequest(endPoints.getAllBooks);
}

export function postNewBook(author, title) {
    return api.postRequest(endPoints.getBook, {author, title}); // ot not breket
}

export function getOneBook(id) {
    return api.getRequest(endPoints.getBook + id)
}

export function putOneBook(author, title, id) {
    return api.putRequest(endPoints.editBook + id, {author, title});
}