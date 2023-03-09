export function getSession() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setSession(data) {
    return sessionStorage.setItem('userData', JSON.stringify(data));
}

export function removeSession() {
    return sessionStorage.removeItem('userData');
}

export function submitHandler(callback) {
    return function(ev) {
        ev.preventDefault();

        const userData = new FormData(ev.target);
        const data = Object.fromEntries([...userData]);

        callback(data, ev.target);
    }
}