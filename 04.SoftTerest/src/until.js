export function renderDom(section) {
    document.getElementById('currentView').replaceChildren(section)
}

export function checkUserNav() {
    const userDate = JSON.parse(sessionStorage.getItem('userData'));

    if(userDate !== null) {
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'none');
        document.querySelectorAll('.user').forEach(e => e.style.display = 'inline-block');
    } else {
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'inline-block');
        document.querySelectorAll('.user').forEach(e => e.style.display = 'none');
    }
}