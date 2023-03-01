export function getSession() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setSession(data) {
    return sessionStorage.setItem('userData', JSON.stringify(data));
}

export function removeSession() {
    return sessionStorage.removeItem('userData')
}

export function submitHangler(callback) {
    return function (ev) {
        ev.preventDefault();

        const dataUser = new FormData(ev.target);
        const data = Object.fromEntries([...dataUser]);

        callback(data, ev.target);
    }
}