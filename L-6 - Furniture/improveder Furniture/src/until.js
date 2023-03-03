export function getUserData() {
    return JSON.parse(sessionStorage.getItem('userData'));
}

export function setUserData(dataUser) {
    return sessionStorage.setItem('userData', JSON.stringify(dataUser));
}

export function removeUserData() {
    return sessionStorage.removeItem('userData');
}

export function submitHandler(callback) {
    return function(ev) {
        ev.preventDefault();
        const formaData = new FormData(ev.target);
        const usingData = Object.fromEntries([...formaData]);
        callback(usingData, ev.target);
    };
}