console.log('TODO...');
window.addEventListener('load', onLoading);
document.getElementById('form').addEventListener('submit', onSubmit);
const tableHeat = document.querySelector(`#results tbody`);

async function onLoading() {

    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/students');

        if(response.ok == false) {
            const error = await response.json();
            throw new Error(error.message);
        }

        const dataResponse = await response.json();
        const students = Object.values(dataResponse);

        for (const line of students) {
            tableHeat.appendChild(createTable(line));
        }
    } catch(err) {
        // alert(err.message)
    }
}

function onSubmit(event) {
    event.preventDefault();

    const currentName = document.querySelectorAll("input[type='text']");

    // const dataForm = new FormData(event.target);

    // const firstName = dataForm.get('firstName');
    // const lastName = dataForm.get('lastName');
    // const facultyNumber = Number(dataForm.get(`facultyNumber`));
    // const grade = Number(dataForm.get('grade'));

    const firstName = currentName[0].value;
    const lastName = currentName[1].value;
    const facultyNumber = Number(currentName[2].value);
    const grade = Number(currentName[3].value);

    if((typeof firstName !== 'string' || firstName.length == 0) || firstName == '' || (typeof lastName !== "string" || lastName.length == 0) || lastName == "" || facultyNumber == '' || grade == '' || Number.isNaN(facultyNumber) || Number.isNaN(grade)) {
        return
    }

    request(firstName, lastName, facultyNumber, grade);

    document.querySelectorAll("input[type='text']").forEach(e => e.value = '');

}

async function request(firstName, lastName, facultyNumber, grade) {
    
    try {
        const response = await fetch('http://localhost:3030/jsonstore/collections/students', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'firstName': firstName,
                'lastName': lastName,
                'facultyNumber': facultyNumber,
                'grade': grade,
            })
        })

        if(response.ok == false) {
            const error = await response.json();
            throw new Error(error.message)
        }

        const dataResponse = await response.json();
        
        tableHeat.appendChild(createTable(dataResponse))

    } catch(err) {
        // alert(err.message)
    }
}

function createTable(data) {

    const row = createHTML('tr');
    row.appendChild(createHTML('th', data.firstName));
    row.appendChild(createHTML('th', data.lastName));
    row.appendChild(createHTML('th', data.facultyNumber));
    row.appendChild(createHTML('th', data.grade));

    return row;
}

function createHTML(type, content) {

    const el = document.createElement(type);

    if(content !== '' && content !== undefined) {
        el.textContent = content;
    }

    return el;
}