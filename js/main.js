const btnSearch = document.querySelector('.form__btn');
const inputCity = document.querySelector('.form__input');
const form = document.querySelector('.form__container');
const card = document.querySelector('.weather');
const btnDelete = document.querySelector('.weather__card__delete');



const deleteCity = id =>{
    console.log(id);
    let cities = readLocalStorage();
    let newcities = cities.filter(x => x.id !== id);
    saveLocalStorage(newcities);
    init();
}

const saveLocalStorage = citiesLocalStorage =>{
    localStorage.setItem('cities',JSON.stringify(citiesLocalStorage));
}

const readLocalStorage = ()=>{
    return JSON.parse(localStorage.getItem('cities')) || [];
}

const celsius = kelvin =>{
    return (parseFloat(kelvin) -273.15).toFixed(1); 
}

const renderHTML = ()=>{
    let cities = readLocalStorage();
    let html = ``;
    cities.forEach(city => {
        html += `
        <div class="weather__card">
                    <div class="weather__card__description">
                        <h1 class="weaher__card__city__name">
                            ${city.name}
                        </h1>
                        <h3 class="weather__card__time">
                            ${city.weather[0].description}
                        </h3>
                        <div class="weather__card__temp__container">
                            <p class="weather__card__temp">
                              ${celsius(city.main.temp)}º
                            </p>
                            <p class="weather__card__temp_fl">
                                ${celsius(city.main.feels_like)}º ST
                            </p>
                        </div>
                        
                    </div>
                    <img  class="weather__card__image" src="https://openweathermap.org/img/wn/${city.weather[0].icon}@2x.png" alt="${city.weather[0].description}">
                    <div class="weather__card__max__min">
                        <p class="weather__card__max">
                            Max: ${celsius(city.main.temp_max)}º
                        </p>
                        <p class="weather__card__min">
                            Min: ${celsius(city.main.temp_min)}º
                        </p>
                        <p class="weather__card__humidity">
                            Humidity: ${city.main.humidity}%
                        </p>
                    </div>
                    <span class="weather__card__delete" onclick="deleteCity(${city.id})">X</span>
                </div>        
        `;
    });

    return html;
}

const searchCity = async e=>{
    e.preventDefault();
    let objCity = {};
    let citiesLocalStorage= readLocalStorage();
    const city = inputCity.value.trim();

    form.reset();

    if(city == ''){
        alert("Write a City");
        return;
    }
    


    objCity = await requestCity(city);

    citiesLocalStorage.unshift(objCity);

    saveLocalStorage(citiesLocalStorage);

    

    card.innerHTML=renderHTML();


}

const init = () =>{
    card.innerHTML=renderHTML();
    form.addEventListener('submit', searchCity);
    
}

init();




