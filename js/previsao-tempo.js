async function buscarTempo() {
    const cidadeInput = document.getElementById('cidade');
    const resultado = document.getElementById('resultadoTempo');
    const cidade = cidadeInput.value.trim();
    
    if (!cidade) {
        resultado.innerHTML = "<p style='color: red;'>Por favor, digite o nome de uma cidade.</p>";
        return;
    }

    resultado.innerHTML = "<p>Buscando clima...</p>";

    try {
        // 1. Geocoding: Transforma nome da cidade em Coordenadas
        const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&format=json`;
        const geoRes = await fetch(geoUrl);
        const geoData = await geoRes.json();

        if (!geoData.results || geoData.results.length === 0) {
            resultado.innerHTML = "<p style='color: red;'>Cidade não encontrada. Tente digitar o nome completo.</p>";
            return;
        }

        const { latitude, longitude, name, admin1, country } = geoData.results[0];

        // 2. Weather API: Busca o clima usando as coordenadas obtidas
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true&timezone=auto`;
        const weatherRes = await fetch(weatherUrl);
        const weatherData = await weatherRes.json();

        const temp = Math.round(weatherData.current_weather.temperature);
        const wind = weatherData.current_weather.windspeed;
        const code = weatherData.current_weather.weathercode;

        // 3. Renderiza o resultado no HTML
        resultado.innerHTML = `
            <div class="password-display" style="display: flex; flex-direction: column; gap: 10px; padding: 20px;">
                <h3 style="margin: 0;">${name}, ${admin1}</h3>
                <small>${country}</small>
                <span style="font-size: 3em; font-weight: bold;">${temp}°C</span>
                <p style="margin: 0;">💨 Vento: ${wind} km/h</p>
            </div>
        `;

    } catch (error) {
        resultado.innerHTML = "<p style='color: red;'>Erro ao conectar com o serviço de clima.</p>";
        console.error("Erro na requisição:", error);
    }
}

// Permite buscar ao apertar "Enter" no teclado
document.getElementById('cidade').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        buscarTempo();
    }
});