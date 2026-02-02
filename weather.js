const apiKey = 'd0337461aac13f9d6f80977c9f139c05';
const weatherDiv = document.getElementById('weather');

function getWeather() {
    const city = document.getElementById('cityDropdown').value;
    weatherDiv.innerHTML = '<div class="card-body">Loading...</div>';
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => {
            if (!response.ok) throw new Error('City not found');
            return response.json();
        })
        
        .then(data => {
            // Get full date and time
            const localTime = new Date((data.dt + data.timezone) * 1000);
            const options = { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            };
            const timeString = localTime.toLocaleTimeString('en-US', options);
            
            weatherDiv.innerHTML = `
                <div class="card-body">
                    <h2 class="text-success">${data.name}</h2>
                    <p class="text-muted">${timeString}</p>
                    <p>Temperature: ${data.main.temp}°C</p>
                    <p>Weather: ${data.weather[0].description}</p>
                    <p>Humidity: ${data.main.humidity}%</p>
                </div>
            `;
        })
        .catch(error => console.error('Error:', error));
}

// Load weather for default city on page load
getWeather();

// Update weather when dropdown changes
document.getElementById('cityDropdown').addEventListener('change', getWeather);