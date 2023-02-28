export function getSessionStorage() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setSessionStorage(data) {
    return sessionStorage.setItem('userData', JSON.stringify(data));
}

export function removeSessionStorage() {
    return sessionStorage.removeItem('userData');
}

export function submitHandlerForm(callback) {
    return function(ev) {
        ev.preventDefault();

        const userDats = new FormData(ev.target);
        const data = Object.fromEntries([...userDats]);

        return callback(data, ev.target);
    }
}