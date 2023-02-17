document.getElementById('register-form').addEventListener('submit', onSubmit);
document.getElementById(`user`).style.display = 'none';
document.querySelectorAll('nav a').forEach(a => a.classList.remove('active'));
document.getElementById('register').classList.add('active');

const notificationRegister = document.querySelector('p.notification');

function onSubmit(ev) {
    ev.preventDefault();

    const getData = new FormData(ev.target);
    const {email, password, rePass} = Object.fromEntries(getData);
    
    if(email == '' || password == '') {
        notificationRegister.textContent = 'Username or Password is empty';
        setTimeout(() => {
            notificationRegister.textContent = ''
        }, 2000)
        return
    }

    if(password !== rePass) {
        notificationRegister.textContent = 'Password is not equal';
        setTimeout(() => {
            notificationRegister.textContent = ''
        }, 2000)
        return
    }

    requestRegister(email, password);
}

async function requestRegister(email, password) {
    
    try {
        const response = await fetch('http://localhost:3030/users/register', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password
            })
        });

        if(response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const data = await response.json();

        window.location = './index.html'
        sessionStorage.setItem("userData", JSON.stringify({
            email: data.email,
            accessToken: data.accessToken,
            id: data._id,
        }));
        
    } catch(err) {
        notificationRegister.textContent = err.message;
        setTimeout(() => {
            notificationRegister.textContent = ''
        }, 2000)
    }
}