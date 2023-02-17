async function getInfo() {
    
    const stopID = document.getElementById(`stopId`).value;
    const stopName = document.getElementById('stopName');
    const busesArrive = document.getElementById('buses');

    try {
        busesArrive.innerHTML = '';
        const data = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopID}`);

        // if(data.status !== 200) {
        //     throw new Error('Error')
        // }

        const response = await data.json();

        stopName.textContent = response.name

        for (const bus in response.buses) {
            const li = document.createElement('li');
            li.textContent = `Bus ${bus} arrives in ${response.buses[bus]} minutes`;
            
            busesArrive.appendChild(li);
        }
    } catch (err) {
        stopName.textContent = 'Error';
    }
}