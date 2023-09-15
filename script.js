
const apikey = "";
const apiurl = "https://api.openweathermap.org/data/2.5/weather?units=metric";
const nexturl = "https://api.openweathermap.org/data/2.5/forecast?units=metric";
// let city = "delhi";

function tarikh(milli)
{
    return (new Date(milli*1000)).toDateString();
}
function shomoy(milli)
{
    return (new Date(milli*1000)).toLocaleTimeString();
}
function direction(deg)
{
    let tmp=parseFloat(deg);
    let val=((tmp/22.5)+0.5);
    const arr=["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
    return arr[parseInt(val % 16)];
}
function capital(str)
{
    return (str.charAt(0).toUpperCase() + str.slice(1));
}
async function current(city) {
    try {
        const response = await fetch(apiurl + `&appid=${apikey}&q=${city}`);
        const data = await response.json();
        document.getElementById("city").innerHTML = data.name;
        document.getElementById("temp").innerHTML = data.main.temp + "°C";
        document.getElementById("temp_min").innerHTML = data.main.temp_min + "°C";
        document.getElementById("temp_max").innerHTML = data.main.temp_max + "°C";
        document.getElementById("feels_like").innerHTML = data.main.feels_like + "°C";
        document.getElementById("humidity").innerHTML = data.main.humidity + "%";
        document.getElementById("pressure").innerHTML = data.main.pressure + " hPa";
        document.getElementById("wind_speed").innerHTML = (parseFloat(data.wind.speed)*3.6).toFixed(2) + " km/h";
        document.getElementById("wind_dir").innerHTML = direction(data.wind.deg);
        document.getElementById("sunrise").innerHTML = shomoy(data.sys.sunrise);
        document.getElementById("sunset").innerHTML = shomoy(data.sys.sunset);
        document.getElementById("weather").innerHTML = capital(data.weather[0].description);
        document.getElementById("cloud").innerHTML = data.clouds.all + "%";
        document.getElementById("visibility").innerHTML = (parseFloat(data.visibility)/1000).toFixed(2) + "km";
        // console.log(data);
    } catch (error) {
        console.error(error);
    }
}

async function forecast(city) {
    try {
        const result = await fetch(nexturl + `&appid=${apikey}&q=${city}`);
        const info = await result.json();
        document.getElementById("date1").innerHTML = tarikh(info.list[8].dt);
        document.getElementById("weather1").innerHTML = capital(info.list[8].weather[0].description);
        document.getElementById("humidity1").innerHTML = info.list[8].main.humidity + "%";
        document.getElementById("max1").innerHTML = info.list[8].main.temp_max + "°C";
        document.getElementById("min1").innerHTML = info.list[8].main.temp_min + "°C";

        document.getElementById("date2").innerHTML = tarikh(info.list[16].dt);
        document.getElementById("weather2").innerHTML = capital(info.list[16].weather[0].description);
        document.getElementById("humidity2").innerHTML = info.list[16].main.humidity + "%";
        document.getElementById("max2").innerHTML = info.list[16].main.temp_max + "°C";
        document.getElementById("min2").innerHTML = info.list[16].main.temp_min + "°C";

        document.getElementById("date3").innerHTML = tarikh(info.list[24].dt);
        document.getElementById("weather3").innerHTML = capital(info.list[24].weather[0].description);
        document.getElementById("humidity3").innerHTML = info.list[24].main.humidity + "%";
        document.getElementById("max3").innerHTML = info.list[24].main.temp_max + "°C";
        document.getElementById("min3").innerHTML = info.list[24].main.temp_min + "°C";

        document.getElementById("date4").innerHTML = tarikh(info.list[32].dt);
        document.getElementById("weather4").innerHTML = capital(info.list[32].weather[0].description);
        document.getElementById("humidity4").innerHTML = info.list[32].main.humidity + "%";
        document.getElementById("max4").innerHTML = info.list[32].main.temp_max + "°C";
        document.getElementById("min4").innerHTML = info.list[32].main.temp_min + "°C";
        // console.log(info);
    }
    catch(error) {
        console.error(error);
    }
}

current("delhi");
forecast("delhi");
let searchcity= document.getElementById("submit");
searchcity.addEventListener("click", function(x){
    x.preventDefault();
    current(query.value);
    forecast(query.value);
    query.value="";
});
let option1= document.getElementById("kolkata");
option1.addEventListener("click", function(x){
    x.preventDefault();
    current("kolkata");
    forecast("kolkata");
});
let option2= document.getElementById("delhi");
option2.addEventListener("click", function(x){
    x.preventDefault();
    current("delhi");
    forecast("delhi");
});
let option3= document.getElementById("bangalore");
option3.addEventListener("click", function(x){
    x.preventDefault();
    current("bangalore");
    forecast("bangalore");
});
let note= document.getElementById("guide");
note.addEventListener("click", function(){
    alert("Minimum and maximum temperatures are the minimum temperature and the maximum temperature recorded in the city at a given time(not the daily minimum and maximum). They have same value except for the cities with multiple weather stations.")
});


document.getElementById("datetime").innerHTML = "Last updated on: "+ new Date();