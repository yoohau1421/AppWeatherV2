const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const wDetails = document.querySelector('.weather-deatils');
const error404 = document.querySelector('.not-found');
const cityHide = document.querySelector('.city-hide');


search.addEventListener('click', () => {

    const APIkey = '1658a07ee7239c856ba7ae7559693218';
    const city = document.querySelector('.search-box input').value;

    if (city == '')
        return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`)
        .then(response => response.json()).then(json => {
            console.log(json);
         
            if(json.cod == '404') {

                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                wDetails.classList.remove('active');
                error404.classList.add('active');
                return;
            }


            const image = document.querySelector('.weather-box img');
            const nhietdo = document.querySelector('.weather-box .nhietdo');
            const mieuta = document.querySelector('.weather-box .mieuta');
            const humidity = document.querySelector('.weather-deatils .humidity span');
            const wind = document.querySelector('.weather-deatils .wind span');

            if (cityHide.textContent == city) {
                return;
            }
            else {
                cityHide.textContent = city;
                container.style.height = '555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                wDetails.classList.add('active');
                error404.classList.remove('active');

                setTimeout(() => {
                    container.classList.remove('active');
                }, 2500);

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.png';
                        break;
    
                    case 'Rain':
                        image.src = 'images/rain.png';
                         break;
                    
                    case 'Snow':
                        image.src = 'images/snow.png';
                        break;
                        
                    case 'Cloud':
                        image.src = 'images/cloud.png';
                        break;
                        
                    case 'Mist':
                        image.src = 'images/mist.png';
                        break;
                        
                    case 'Haze':
                        image.src = 'images/mist.png';
                        break;
    
                    default:
                        image.src = 'images/cloud.png';
                }
    
                nhietdo.innerHTML = `${parseInt(json.main.temp)}<span>&deg;C</span>`;
                mieuta.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                const infoWeather = document.querySelector('.info-weather');
                const infoHumidity = document.querySelector('.info-humidity');
                const infoWind = document.querySelector('.info-wind');

                const elCloneweather = infoWeather.cloneNode(true); //tạo các bản sao sâu (deep clone)
                const elClonehumidity = infoHumidity.cloneNode(true);
                const elClonewind = infoWind.cloneNode(true);

                elCloneweather.id = 'clone-weather'; //thêm id cho các bản sao
                elCloneweather.classList.add('active-clone'); //thêm class cho các bản sao

                elClonehumidity.id = 'clone-humidity';
                elClonehumidity.classList.add('active-clone');

                elClonewind.id = 'clone-wind';
                elClonewind.classList.add('active-clone');

                //setTimeout() được sử dụng để trì hoãn việc thực thi hàm con bên trong nó. 
                // Sau 2,2 giây (2200 milliseconds), hàm này sẽ được gọi.
                setTimeout(() => {
                    //thêm các bản sao vào sau các phần tử gốc
                    infoWeather.insertAdjacentElement("afterend", elCloneweather); 
                    infoHumidity.insertAdjacentElement("afterend", elClonehumidity);
                    infoWind.insertAdjacentElement("afterend", elClonewind);
                }, 2200);

                const cloneWeather = document.querySelectorAll('.info-weather.active-clone'); //lấy tất cả các bản sao
                const totalCloneWeather = cloneWeather.length; //đếm số lượng bản sao
                const cloneInfoWeatherFirst = cloneWeather[0]; //lấy bản sao đầu tiên

                const cloneHumidity = document.querySelectorAll('.info-humidity.active-clone');
                const cloneHumidityFirst = cloneHumidity[0];

                const cloneWind = document.querySelectorAll('.info-wind.active-clone');
                const cloneWindFirst = cloneWind [0];

                if (totalCloneWeather > 0) {
                    cloneInfoWeatherFirst.classList.remove('active-clone'); //xóa class active-clone
                    cloneHumidityFirst.classList.remove('active-clone');
                    cloneWindFirst.classList.remove('active-clone');

                    setTimeout(() => {
                        cloneInfoWeatherFirst.remove(); //xóa bản sao
                        cloneHumidityFirst.remove();
                        cloneWindFirst.remove();
                    }, 2200);
                }
            }     
    })
})