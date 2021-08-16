const select = document.getElementById("countries");
const showWeather = document.getElementById("showWeatherInfo");

var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};

console.log(select,'select *******************************')

fetch("https://restcountries.eu/rest/v2/all", requestOptions)
    .then(response => response.json())
    .then(data => {
        let htmlSelector = '';
        htmlSelector = '<option value="chooseOnePlace">Choose one place plz</option>'
        for (let c of data) {
            console.log(c.code)
            htmlSelector += `<option value="${c.name.toLowerCase()}">${c.name}</option>`;
        }
        console.log(data);
        select.innerHTML = htmlSelector;
    })
    .catch(error => console.log('error', error)); 

var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "8ce2c0aa26msh1bc7e28a0966945p1a0c1ejsnfe3b547760cf");

    async function showWeatherData(url,requestOptionsForWeatherAPI){
    document.getElementById("loaderForShow").style.display = "block";
    document.getElementById("newsLink").style.display = "block";
    document.getElementById("showWeatherInfo").style.display = "none";
    const response = await fetch(url,requestOptionsForWeatherAPI);
    document.getElementById("loaderForShow").style.display = "none";
    document.getElementById("newsLink").style.display = "none";
    document.getElementById("showWeatherInfo").style.display = "block";
    var data = await response.json();
    let htmlForWeather = '';
    htmlForWeather += `<div class="designForInfo">`;
    htmlForWeather += `<p>Time:"${data.current.last_updated}"</p>`;
    htmlForWeather += `<p>Weather:"${data.current.condition.text}"</p>`;
    htmlForWeather += `<p>celsius:"${data.current.temp_c}"</p>`;
    htmlForWeather += `<p>Fahrenheit:"${data.current.temp_f}"</p>`;
    console.log(data.location.lon + "jjjjjjjjjj");
    console.log(data.current.temp_f + "jjjjjjjjjj");
    console.log(data + "hiiiiiii");
    showWeather.innerHTML = htmlForWeather;
}

select.onchange = function (e) {
    console.log(e.value)
    showWeatherData("https://weatherapi-com.p.rapidapi.com/current.json?q=" + select.value , {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    });
};

showWeatherData();