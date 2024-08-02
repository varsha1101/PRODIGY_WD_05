document.getElementById('locationForm').addEventListener('submit', function(e) 
{
    
e.preventDefault();
    
const location = document.getElementById('locationInput').value;
    
getWeatherData(location);

});


document.getElementById('currentLocationBtn').addEventListener('click', function() 
{
    
if (navigator.geolocation) 
{
        
navigator.geolocation.getCurrentPosition(function(position) 
{
            
const lat = position.coords.latitude;
            
const lon = position.coords.longitude;
            getWeatherData(null, lat, lon);
        
});
    
} 
else 
{
        
alert('Geolocation is not supported by this browser.');
    
}

});


function getWeatherData(location, lat = null, lon = null) 
{
    
let apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
    
let apiKey = 'YOUR_API_KEY'; 
if (location) 
{
        
apiUrl += `?q=${location}&appid=${apiKey}&units=metric`;
   
} 
else if (lat && lon) 
{
        
apiUrl += `?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
    
}

    
fetch(apiUrl)
        
.then(response => response.json())
        
.then(data => displayWeatherData(data))
        
.catch(error => console.error('Error fetching weather data:', error));

}


function displayWeatherData(data) 
{
    
const weatherDiv = document.getElementById('weather');
    weatherDiv.innerHTML = `
        
<h2>Weather in ${data.name}</h2>
        
<p>Temperature: ${data.main.temp} °C</p>
        
<p>Conditions: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity} %</p>
        
<p>Wind Speed: ${data.wind.speed} m/s</p>
    `
;
}