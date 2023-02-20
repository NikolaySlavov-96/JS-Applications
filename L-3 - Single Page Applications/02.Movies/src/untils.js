export const endPoints = {
    'register': '/users/register',
    'login': '/users/login',
    'logout': '/users/logout',
    'movieRequest': '/data/movies',
    'getLikes': '/data/likes?where=movieId%3D%22{movieId}%22&distinct=_ownerId&count',
    'getLikeUser': '/data/likes?where=movieId%3D%22{movieId}%22%20and%20_ownerId%3D%22{userId}%22',
    'addRevokeLike': '/data/likes',
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

export function checkUserType(idUser) {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    if(idUser !== userData.id) {
        return false;
    }
    return true;
}

export function editViewFielt(idMovie) {
    document.querySelector('#edit-movie h1').id = idMovie._id;
    const inputField = document.querySelectorAll('#edit-movie .form-control');
    inputField[0].value = idMovie.title;
    inputField[1].textContent = idMovie.description;
    inputField[2].value = idMovie.img;
}