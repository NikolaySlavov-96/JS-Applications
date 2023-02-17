function lockedProfile() {
    createPerUser()
}
const mainMain = document.getElementById('main');

async function createPerUser() {

    try {
        const response = await fetch(`http://localhost:3030/jsonstore/advanced/profiles`);

        if(response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();
        const profiles = Object.values(data);

        counter = 1;
        for (const profil of profiles) {
            mainMain.appendChild(createElem(profil, counter));
            counter++;
        }
        
    } catch(err) {
        alert(err.message);
    }
}

function createElem(data, number) {

    const elem = document.createElement('div');
    elem.classList.add('profile');
    elem.innerHTML = `<img src="./iconProfile2.png" class="userIcon" />
    <label>Lock</label>
    <input type="radio" name="user${number}Locked" value="lock" checked>
    <label>Unlock</label>
    <input type="radio" name="user${number}Locked" value="unlock"><br>
    <hr>
    <label>Username</label>
    <input type="text" name="user${number}Username" value="${data.username}" disabled readonly />
    <div class="user${number}Username">
        <hr>
        <label>Email:</label>
        <input type="email" name="user${number}Email" value="${data.email}" disabled readonly />
        <label>Age:</label>
        <input type="text" name="user${number}Age" value="${data.age}" disabled readonly />
    </div>
    
    <button>Show more</button>`

    elem.querySelector('.profile div').style.display = 'none';
    elem.querySelector('button').addEventListener('click', typeView);

    return elem
}

function typeView(ev) {
    
    const profile = ev.target.parentElement
    const checkedProfile = profile.querySelector('input[type="radio"][value="unlock"]').checked;

    if(checkedProfile) {
        const view = profile.querySelector('.profile div');
        const btn = profile.querySelector('button')
        if(ev.target.textContent === 'Show more') {
            btn.textContent = 'Hide it';
            view.style.display = 'inline-block';
        } else {
            view.style.display = 'none';
            btn.textContent = 'Show more';
        }
    }

}