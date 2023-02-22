export function renderDom(section) {
    document.getElementById('currentView').replaceChildren(section)
}

export function checkUserNav() {
    const userDate = checkSessionStorage();

    if(userDate !== null) {
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'none');
        document.querySelectorAll('.user').forEach(e => e.style.display = 'inline-block');
    } else {
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'inline-block');
        document.querySelectorAll('.user').forEach(e => e.style.display = 'none');
    }
}

export function createSubmitHandler(form, callBack) {
    form.addEventListener('submit', onSubmit)

    function onSubmit(ev) {
        ev.preventDefault();

        const userData = new FormData(form);
        callBack(Object.fromEntries([...userData.entries()]))
    }
}

export function checkSessionStorage() {
    const userDate = JSON.parse(sessionStorage.getItem('userData'));
    return userDate
}

export function userDateSessionStorage(data) {
    const userDate = {
        email: data.email,
        accessToken: data.accessToken,
        id: data._id,
    }
    sessionStorage.setItem('userData', JSON.stringify(userDate))
}