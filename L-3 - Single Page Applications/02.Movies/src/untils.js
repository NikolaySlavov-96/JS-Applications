export const endPoints = {
    'register': '/users/register',
    'login': '/users/login',
    'logout': '/users/logout',
    'movieGetCreate': '/data/movies',
    'movieUpdateDelete': '/data/movies/:id',
    'getLikes': '/data/likes?where=movieId%3D%22{movieId}%22&distinct=_ownerId&count',
    'getLikeUser': '/data/likes?where=movieId%3D%22{movieId}%22%20and%20_ownerId%3D%22{userId}%22',
    'addLike': '/data/likes',
    'revokeLike': '/data/likes/:id'
}

export function checkUserNav() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));

    if(userData !== null) {
        document.getElementById('welcome-msg').textContent = `Welcome, ${userData.email}`
        Array.from(document.querySelectorAll('.user')).map(e => e.style.display = 'inline-block')
        Array.from(document.querySelectorAll('.guest')).map(e => e.style.display = 'none');
    } else {
        Array.from(document.querySelectorAll('.user')).map(e => e.style.display = 'none')
        Array.from(document.querySelectorAll('.guest')).map(e => e.style.display = 'inline-block');
    }
}

export function createSubmitHandler(form, callback) {
    form.addEventListener('submit', onSubmit);

    function onSubmit(ev) {
        ev.preventDefault();

        const formData = new FormData(form);
        callback(Object.fromEntries([...formData.entries()]))
    }
}