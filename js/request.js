const key = '88b3e1e9ba3f525d402158e8e6eecdf2';


const requestCity = async(city)=>{
    const baseURL = 'https://api.openweathermap.org/data/2.5/';
    const paramsURL =`weather?q=${city}&appid=${key}`
    
    const response = await fetch(`${baseURL}${paramsURL}`);

    const data = await response.json();

    return data;
};

//requestCity();