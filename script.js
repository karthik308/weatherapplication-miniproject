let lat;
let long;
let locationName = document.getElementById("locationName");
let setIcon =document.getElementById("icon");
let desc =document.getElementById("description");
let temperature= document.getElementById("temp");
let minTemp=document.getElementById("min");
let maxTemp =document.getElementById("max");
let windSpeed = document.getElementById("windSpeed");


if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition( async position =>{

        lat=position.coords.latitude;
        long=position.coords.longitude;

        // console.log("latitude "+lat+"longitude "+long)
        let data = await getWeatherData(lat ,long);

        var map = L.map('map').setView([lat, long], 7);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
var marker = L.marker([lat, long]).addTo(map);
marker.bindPopup(`<b>${data.name}</b>`).openPopup();

map.on("click",async function(e){
    const data =await getWeatherData(e.latlng.lat ,e.latlng.lng);
    marker.setLatLng([e.latlng.lat ,e.latlng.lng]);
    marker.bindPopup(`<b>${data.name}</b>`).openPopup();
});

        return data;
    });
}
async function getWeatherData(lat,long){
    let api =`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=b516a42d15ab3e6cfa50c66593bbfab2`

    let response= await fetch(api)
    let data= await response.json();

    console.log(data);
    datahandler(data);

    return data ;

}
function datahandler(data){
    const {temp ,temp_min ,temp_max}=data.main;
    const {description}=data.weather[0];
    const {speed}=data.wind;
    const {icon}=data.weather[0];

    locationName.innerHTML =data.name;
    desc.innerHTML =description;
    temperature.innerHTML =temp;
    minTemp.innerHTML ="Min_temp"+ temp_min;
    
    maxTemp.innerHTML ="Max_temp"+ temp_max;
    windSpeed.innerHTML=speed;
    setIcon.style["background-image"]=`url(${setIconFunction(icon)})`
    


}
function setIconFunction(icon) {
 
    const icons = {
        "01d": "./animated/day.svg",
        "02d": "./animated/cloudy-day-1.svg",
        "03d": "./animated/cloudy-day-2.svg",
        "04d": "./animated/cloudy-day-3.svg",
        "09d": "./animated/rainy-1.svg",
        "10d": "./animated/rainy-2.svg",
        "11d": "./animated/rainy-3.svg",
        "13d": "./animated/snowy-6.svg",
        "50d": "./animated/mist.svg",
        "01n": "./animated/night.svg",
        "02n": "./animated/cloudy-night-1.svg",
        "03n": "./animated/cloudy-night-2.svg",
        "04n": "./animated/cloudy-night-3.svg",
        "09n": "./animated/rainy-1.svg",
        "10n": "./animated/rainy-2.svg",
        "11n": "./animated/rainy-3.svg",
        "13n": "./animated/snowy-6.svg",
        "50n": "./animated/mist.svg"
    };
 
    return icons[icon];
}