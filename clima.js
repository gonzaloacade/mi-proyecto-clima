// clima.js
const API_KEY = '0291dd272d30141ccb8588aa33caba5d'; // Reemplaza con tu clave real
const CIUDAD = 'Formosa,AR';

document.addEventListener('DOMContentLoaded', () => {
    const loading = document.getElementById('loadingState');
    const error = document.getElementById('errorState');
    const retryButton = document.getElementById('retryButton');

    const climaContainer = document.createElement('section');
    climaContainer.className = 'clima';
    climaContainer.innerHTML = `
        <h2>Clima Actual en Formosa</h2>
        <p id="temp"></p>
        <p id="desc"></p>
        <p id="humedad"></p>
    `;
    document.querySelector('.app__container').appendChild(climaContainer);

    function mostrarClima(data) {
        document.getElementById('temp').textContent = `Temperatura: ${data.main.temp}°C`;
        document.getElementById('desc').textContent = `Condición: ${data.weather[0].description}`;
        document.getElementById('humedad').textContent = `Humedad: ${data.main.humidity}%`;
    }

    async function cargarClima() {
        loading.classList.remove('hidden');
        error.classList.add('hidden');

        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${CIUDAD}&appid=${API_KEY}&units=metric&lang=es`);
            if (!res.ok) throw new Error('Error en la respuesta');
            const data = await res.json();
            mostrarClima(data);
            loading.classList.add('hidden');
        } catch (err) {
            loading.classList.add('hidden');
            error.classList.remove('hidden');
            console.error(err);
        }
    }

    retryButton.addEventListener('click', cargarClima);
    cargarClima();
});
