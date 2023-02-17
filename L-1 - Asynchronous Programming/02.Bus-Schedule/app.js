function solve() {
    
    let closureStops = 'depot';
    let closureName = '';
    const displayStop = document.querySelector(`#info > span`);
    const departBtn = document.getElementById(`depart`);
    const arriveBtn = document.getElementById(`arrive`);

    async function depart() {
        try {
            const response = await fetch(`http://localhost:3030/jsonstore/bus/schedule/${closureStops}`);

            const data = await response.json();

            displayStop.textContent = `Next stop ${data.name}`
            closureName = data.name
            closureStops = data.next;


            departBtn.disabled = true;
            arriveBtn.disabled = false;
        } catch(err) {
            departBtn.disabled = false;
            arriveBtn.disabled = false;

            displayStop.textContent = 'Error'
        }
    }

    function arrive() {
        displayStop.textContent = `Arriving at ${closureName}`

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();