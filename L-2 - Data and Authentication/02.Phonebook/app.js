function attachEvents() {
    
    document.getElementById('btnLoad').addEventListener('click', onLoad);
    document.getElementById('btnCreate').addEventListener('click', onCreate);

    const phoneBookUl = document.getElementById('phonebook');

    async function onLoad() {

        try {
            const response = await fetch('http://localhost:3030/jsonstore/phonebook');

            if(response.ok == false){
                const error = await response.json();
                throw new Error(error.message);
            }

            phoneBookUl.innerHTML = '';
            const dataResponse = await response.json();

            const dataValue = Object.values(dataResponse);

            for (const line of dataValue) {
                phoneBookUl.appendChild(createElem(line))
            }

        } catch(err) {
            alert(err.message);
        }
    }

    async function onCreate() {

        const personInput = document.getElementById('person').value;
        const phonoInput = document.getElementById('phone').value;

        try {
            const response = await fetch('http://localhost:3030/jsonstore/phonebook/', {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({person: personInput, phone: phonoInput})
            })

            if(response.ok == false) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const dataResponse = await response.json();
            // const data = {person: personInput, phone: phonoInput, _id: dataResponse._id}
            phoneBookUl.appendChild(createElem(dataResponse))

        } catch(err) {
            alert(err.message);
        }

    }

    function createElem(el) {
        console.log(el)
        const li = document.createElement('li');
        li.textContent = `${el.person}: ${el.phone}`
        li.setAttribute('data-id', el._id);
        const dellBtn = document.createElement('button');
        dellBtn.textContent = 'Delete';
        li.appendChild(dellBtn)

        dellBtn.addEventListener('click', onDelete);
        return li;
    }

    function onDelete(ev) {

        const idElement = ev.target.parentElement.getAttribute('data-id');
        fetch('http://localhost:3030/jsonstore/phonebook/' + idElement, {
            method: 'delete'
        });
        ev.target.parentElement.remove();
    }
}

attachEvents();