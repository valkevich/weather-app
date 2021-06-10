window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let weatherIcon = document.querySelector('.icon');
    

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition( position => {
           long = position.coords.longitude;
           lat = position.coords.latitude;

           const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=0ee723a474fed265b2c6097e63fdbc94`;

           fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {
                let {temp} = data.main;
                const name = data.name
                const {description, icon} = data.weather[0];

                temp = Math.floor(+temp - 273.15);
                
                temperatureDegree.textContent = temp;
                locationTimezone.textContent = name;
                temperatureDescription.textContent = description;
                weatherIcon.src = `http://openweathermap.org/img/w/${icon}.png`;

            });

        });
        
    };
});
