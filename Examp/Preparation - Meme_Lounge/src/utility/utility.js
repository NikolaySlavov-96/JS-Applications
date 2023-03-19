export function getSessiong() {
    return JSON.parse(sessionStorage.getItem('userData'))
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

        const user = new FormData(ev.target);
        const userData = Object.fromEntries([...user]);

        callback(userData, ev.target);
    }
}