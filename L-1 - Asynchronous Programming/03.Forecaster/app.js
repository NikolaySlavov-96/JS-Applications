function attachEvents() {

    const typeWeather = {
        'Sunny': '&#x2600', // ☀
        'Partly sunny': '&#x26C5', // ⛅
        'Overcast': '&#x2601', // ☁
        'Rain': '&#x2614', // ☂
        'Degrees': '&#176',   // °
    }

    document.getElementById(`submit`).addEventListener('click', waitServer);
    const inputLocation = document.getElementById(`location`);

    const forecastDiv = document.getElementById(`forecast`);
    const forestFirstDay = document.querySelector(`#current .label`);

    const currentWeather = document.getElementById(`current`);
    const upComingWeather = document.getElementById('upcoming');

    async function waitServer() {

        try {
            const request = await fetch('http://localhost:3030/jsonstore/forecaster/locations');

            // if(request.ok === false) {
            //     throw new Error(`dont given correct city`)
            // }
            const data = await request.json();
            const result = data.find(loc => loc.name === inputLocation.value);

            if(result === undefined) {
                throw new Error();
            }
            const requestWetherOne = await fetch(`http://localhost:3030/jsonstore/forecaster/today/${result.code}`);
            const dataOneDay = await requestWetherOne.json();

            const requestWetherThree = await fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${result.code}`);
            const dataThreDay = await requestWetherThree.json();

            forecastDiv.style.display = 'block';
            
            
            const divOne = createHTMLElement('div', 'forecasts');
            const firsSpanOne = createHTMLElement('span', 'condition');
            firsSpanOne.classList.add('symbol');
            firsSpanOne.innerHTML = `${typeWeather[dataOneDay.forecast.condition]}`
            divOne.appendChild(firsSpanOne);
            const spanOneDays = createHTMLElement('span', 'condition');
            spanOneDays.appendChild(createHTMLElement('span', 'forecast-data', dataOneDay.name));
            spanOneDays.appendChild(createHTMLElement('span', 'forecast-data', `${dataOneDay.forecast.low}${typeWeather["Degrees"]}/${dataOneDay.forecast.high}${typeWeather["Degrees"]}`));
            spanOneDays.appendChild(createHTMLElement('span', 'forecast-data', dataOneDay.forecast.condition));
            divOne.appendChild(spanOneDays);
            currentWeather.appendChild(divOne);
            
            const divThree = createHTMLElement('div', 'forecast-info');
            for (const line of dataThreDay.forecast) {
                divThree.appendChild(createThreeDays(line.condition, line.low, line.high));
            }
            upComingWeather.appendChild(divThree);

        } catch(err) {
            forecastDiv.style.display = 'block';
            forestFirstDay.textContent = 'Error';
        }
    }

    function createHTMLElement(type, classNames, content) {

        const elem = document.createElement(type);
        
        if(classNames !== '' && classNames !== undefined) {
            elem.classList.add(classNames);
        }

        if(content !== '' && content !== undefined) {
            elem.innerHTML = content
        }

        return elem;
    }

    function createThreeDays(typeWeat, low, hight) {
        const firsSpanThree = createHTMLElement('span', 'upcoming');
        const symbolSpan = createHTMLElement('span', 'symbol');
        symbolSpan.innerHTML = typeWeather[typeWeat];
        firsSpanThree.appendChild(symbolSpan);
        firsSpanThree.appendChild(createHTMLElement('span', 'forecast-data', `${low}${typeWeather["Degrees"]}/${hight}${typeWeather["Degrees"]}`));
        firsSpanThree.appendChild(createHTMLElement('span', 'forecast-data', typeWeat));
        return firsSpanThree;
    }
}

attachEvents();