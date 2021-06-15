(async function(){
let alert=document.getElementById("alert")
let origin="cairo";
let locInput =document.getElementById("locInput")

let response= await (await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4c98c0a60a01412582b140449210305&q=${origin}&days=3`)).json()

/* Date Converter*/
let day1 = new Date(response.forecast.forecastday[0].date);
let day1Day=day1.getDay();
let day1Month=day1.getMonth();
let day1Date =day1.getDate();

let day2 = new Date(response.forecast.forecastday[1].date);
let day2Day=day2.getDay();

let day3 = new Date(response.forecast.forecastday[2].date);
let day3Day=day3.getDay();

const days=[ 'Sunday','Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const months =['January','February','March','April', 'May','June','July','August','September','October','November','December']
/* End Of Date Converter*/

showWheather() 

// Change City
locInput.addEventListener("keyup",changeOrigin)
async function changeOrigin()
{
    origin=locInput.value
    response= await (await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4c98c0a60a01412582b140449210305&q=${origin}&days=3`)).json()
    // Check If Api Was Wrong
    if(response.error?.message=="No matching location found."||response.error?.message=="Parameter q is missing.")
    {
        if(locInput.value.length>3)
        {
            alert.classList.replace("d-none","d-block")
        }
    }
    else
    {
        alert.classList.replace("d-block","d-none") 
        showWheather()
    }
    
}
// Show Weather Forecast
function showWheather()
{
    let one =
    {
        date:response.forecast.forecastday[0].date,
        city:response.location.name,
        currentTemp:Math.round(response.current.temp_c),
        maxTemp:Math.round(response.forecast.forecastday[0].day.maxtemp_c),
        minTemp:Math.round(response.forecast.forecastday[0].day.mintemp_c),
        conditionIcon:response.forecast.forecastday[0].day.condition.icon,
        conditionText:response.forecast.forecastday[0].day.condition.text,
        humidity:response.current.humidity,
        windSpeed:response.current.wind_kph,
        windDir:response.current.wind_dir,
    }
    let two =
    {
        date:response.forecast.forecastday[1].date,
        city:response.location.name,
        maxTemp:Math.ceil(response.forecast.forecastday[1].day.maxtemp_c),
        minTemp:Math.ceil(response.forecast.forecastday[1].day.mintemp_c),
        conditionIcon:response.forecast.forecastday[1].day.condition.icon,
        conditionText:response.forecast.forecastday[1].day.condition.text,
        // humidity:response.current.humidity,
        // windSpeed:response.current.wind_kph,
        // windDir:response.current.wind_dir,
    }
    let three =
    {
        date:response.forecast.forecastday[2].date,
        city:response.location.name,
        maxTemp:Math.ceil(response.forecast.forecastday[2].day.maxtemp_c),
        minTemp:Math.ceil(response.forecast.forecastday[2].day.mintemp_c),
        conditionIcon:response.forecast.forecastday[2].day.condition.icon,
        conditionText:response.forecast.forecastday[2].day.condition.text,
        // humidity:response.current.humidity,
        // windSpeed:response.current.wind_kph,
        // windDir:response.current.wind_dir,
    }

let weatherDays=document.getElementById("weatherDays")
weatherDays.innerHTML=`
    <div class="col-lg-4 ">
    <div class="forecast one bg-footer  ">
        <div class="forcast-date  d-flex justify-content-between p-2">
            <span>${days[day1Day]}</span>
             <span>${day1Date} ${months[day1Month]}</span>
        </div>
        <div class="forcast-content  p-3">
            <p>${one.city}</p>
            <div class="degree d-flex justify-content-between align-items-center">
                <h3 class="font-weight-bold text-white">${one.currentTemp}<sup>o</sup>C</h3>
                <img class="" src="https:${one.conditionIcon}" alt="conditionIcon">
            </div>
              <p>${one.maxTemp}<sup>o</sup>C / ${one.minTemp}<sup>o</sup>C</p>
             <p class="my-3 text-main">${one.conditionText}</p>
             <span class="mr-3"><img src="images/icon-umberella.png" alt="humidity"> ${one.humidity}% </span>
             <span class="mr-3"><img src="images/icon-wind.png" alt="wind Speed"> ${one.windSpeed}km/h</span>
             <span ><img src="images/icon-compass.png" alt="wind Direction"> ${one.windDir}</span>
        </div>
    </div>
    </div>

    <div class="col-lg-4">
    <div class="forecast two h-100 text-center  overflow-hidden">
        <div class="forcast-date p-2 ">
        <span>${days[day2Day]}</span>
        </div>
        <div class="forcast-content h-100 d-flex align-items-center justify-content-center  p-3">
            <div class="forecast-bottom">
                <img src="https:${two.conditionIcon}" alt="conditionIcon">
                <h3 class="mt-4 text-white">${two.maxTemp}<sup>o</sup>C</h3>
                <h5 class="mb-4">${two.minTemp}<sup>o</sup>C</h5>
                <p class="text-main">${two.conditionText}</p>
            </div>
        </div>
    </div>
    </div>

    <div class="col-lg-4" >
    <div class="forecast three bg-footer h-100 text-center  overflow-hidden">
    <div class="forcast-date p-2 ">
        <span>${days[day3Day]}</span>
    </div>
    <div class="forcast-content h-100 d-flex align-items-center justify-content-center  p-3">
        <div class="forecast-bottom">
            <img src="https:${three.conditionIcon}" alt="conditionIcon">
            <h3 class="mt-4 text-white">${three.maxTemp}<sup>o</sup>C</h3>
            <h5 class="mb-4">${three.minTemp}<sup>o</sup>C</h5>
            <p class="text-main">${three.conditionText}</p>
        </div>
    </div>
    </div>
    </div>
    `
}

})();
