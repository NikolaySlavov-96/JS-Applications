export function getSession() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setSessiont(data) {
    return sessionStorage.setItem('userData', JSON.stringify(data));
}

export function removeSession() {
    return sessionStorage.removeItem('userData');
}

export function submitHandler(callback) {
    return function (ev) {
        ev.preventDefault();

        const data = new FormData(ev.target);
        const userData = Object.fromEntries([...data]);

        callback(userData, ev.target);
    }
}