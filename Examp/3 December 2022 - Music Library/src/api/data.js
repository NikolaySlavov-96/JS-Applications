import * as api from './api.js';

const endpoints = {
    'getAllAlbums': 'data/albums?sortBy=_createdOn%20desc',
    'addAlbum': 'data/albums',
    'CRUD': 'data/albums/',
    'likeAlbum': 'data/likes',
    'allLikeAlbum': (albumId) => `data/likes?where=albumId%3D%22${albumId}%22&distinct=_ownerId&count`,
    'likeSpecific': (albumId, userId) => `data/likes?where=albumId%3D%22${albumId}%22%20and%20_ownerId%3D%22${userId}%22&count`,
}

export async function getAlbums() {
    const data = await api.getRequest(endpoints.getAllAlbums);
    return data;
}

export async function addAlbum(data) {
    const result = await api.postRequest(endpoints.addAlbum, data);
    return result;
}

export async function getAlbum(id) {
    const data = await api.getRequest(endpoints.CRUD + id);
    return data;
}

export async function editAlbum(id, data) {
    const editData = await api.putRequest(endpoints.CRUD + id, data);
    return editData;
}

export async function dellAlbum(id) {
    const dataDell = await api.dellRequest(endpoints.CRUD + id);
    return dataDell
}

export async function likeAlbum(albumId) {
    const dataLike= await api.postRequest(endpoints.likeAlbum, {albumId});
    return dataLike;
}

export async function allLikesAlbum(id) {
    const allLikes = await api.getRequest(endpoints.allLikeAlbum(id));
    return allLikes;
}

export async function likeSpecificUser(id, userId) {
    const likeUser = await api.getRequest(endpoints.likeSpecific(id, userId));
    return likeUser;
}