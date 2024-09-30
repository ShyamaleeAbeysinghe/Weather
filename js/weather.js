let dateTime01 = document.getElementById("dateTime01")
let temperature = document.getElementById("temperature")
let humidity = document.getElementById("humidity")
let windSpeed = document.getElementById("windSpeed")
let weatherDescription = document.getElementById("weatherDescription")
let feelTemperature = document.getElementById("feelTemperature")
let alert01 = document.getElementById("alert01")
let tblAlert = document.getElementById("tblAlert")

let todayClimate = document.getElementById("todayClimate")
let imgToday01 = document.getElementById("imgToday01")
let region = document.getElementById("region")

let forecastData;
let historyData;




function loadPage(region) {
   fetch("https://api.weatherapi.com/v1/forecast.json?key=10fd1d1e0ca24a2f99e101538242808&q=" + region + "&days=4&alerts=yes")
      .then(data => data.json())
      .then(data => {
         forecastData = data;
      }).then(function (json) {
         loadForecastData("Celcious");
      })
      .catch(error => {
         console.log("fetch error")
         alert("Error in connecting. Please try again later")
           
       });

   var d = new Date();
   var yesterday = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate() );
   var lastweek = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + (d.getDate() - 7);

   fetch("https://api.weatherapi.com/v1/history.json?key=10fd1d1e0ca24a2f99e101538242808&q=" + region + "&dt="+lastweek+"&end_dt="+yesterday)
      .then(data => data.json())
      .then(data => {
         historyData = data;
      }).then(function (json) {
         loadHistoryData("Celcious")
         
      })
      .catch(error => {
         console.log("fetch error")
         alert("Error in connecting. Please try again later")
           
       });


}

function loadForecastData(temperatureInput) {

   humidity.innerHTML = forecastData.current.humidity + "%";
   windSpeed.innerHTML = forecastData.current.wind_kph + "kph"
   weatherDescription.innerHTML = forecastData.current.condition.text;

   if (forecastData.alerts.alert.length == 0) {
      tblAlert.style.visibility = "collapse";
      alert01.style.visibility = "visible";
   } else {
      tblAlert.style.visibility = "visible";
      alert01.style.visibility = "collapse";
   }

   for (var index = 0; index < 3; index++) {
      var tempIndex = index;
      tempIndex++;

      let imgForecast = document.getElementById("imgForecast0" + tempIndex)
      imgForecast.src = forecastData.forecast.forecastday[index].day.condition.icon;

      let forecastDay = document.getElementById("forecastDay0" + tempIndex)
      forecastDay.innerHTML = forecastData.forecast.forecastday[index].date;

      let forecastTemp = document.getElementById("forecastTemp0" + tempIndex)
      forecastTemp.innerHTML = forecastData.forecast.forecastday[index].day.condition.text;



   }

   todayClimate.innerHTML = forecastData.current.condition.text;
   imgToday01.src = forecastData.current.condition.icon

   for (var index = 0; index < 24; index++) {
      var tempIndex = index;
      tempIndex++;
      let hourlyTime = document.getElementById("hourlyTime" + tempIndex)
      hourlyTime.innerHTML = forecastData.forecast.forecastday[0].hour[index].time;

      let hourlyImg = document.getElementById("hourlyImg" + tempIndex)
      hourlyImg.src = forecastData.forecast.forecastday[0].hour[index].condition.icon;

   }



   if (temperatureInput == "Celcious") {
      temperature.innerHTML = forecastData.current.temp_c + "°C";
      feelTemperature.innerHTML = forecastData.current.feelslike_c + "°C";

      for (var index = 0; index < 3; index++) {
         var tempIndex = index;
         tempIndex++;

         let tempMin = document.getElementById("tempMin0" + tempIndex)
         tempMin.innerHTML = forecastData.forecast.forecastday[index].day.mintemp_c + "°C";

         let tempMax = document.getElementById("tempMax0" + tempIndex)
         tempMax.innerHTML = forecastData.forecast.forecastday[index].day.maxtemp_c + "°C";

      }

      for (var index = 0; index < 24; index++) {
         var tempIndex = index;
         tempIndex++;

         let hourlyTemp = document.getElementById("hourlyTemp" + tempIndex)
         hourlyTemp.innerHTML = forecastData.forecast.forecastday[0].hour[index].temp_c + "°C";


      }

   } else {
      temperature.innerHTML = forecastData.current.temp_f + "°F";
      feelTemperature.innerHTML = forecastData.current.feelslike_f + "°F";

      for (var index = 0; index < 3; index++) {
         var tempIndex = index;
         tempIndex++;

         let tempMin = document.getElementById("tempMin0" + tempIndex)
         tempMin.innerHTML = forecastData.forecast.forecastday[index].day.mintemp_f + "°F";

         let tempMax = document.getElementById("tempMax0" + tempIndex)
         tempMax.innerHTML = forecastData.forecast.forecastday[index].day.maxtemp_f + "°F";

      }

      for (var index = 0; index < 24; index++) {
         var tempIndex = index;
         tempIndex++;

         let hourlyTemp = document.getElementById("hourlyTemp" + tempIndex)
         hourlyTemp.innerHTML = forecastData.forecast.forecastday[0].hour[index].temp_f + "°F";


      }
   }
}

function loadHistoryData(temperatureInput) {
   for (var index = 0; index < 7; index++) {
      var tempIndex = index;
      tempIndex++;

      let imgHistort = document.getElementById("imgHistort0" + tempIndex)
      imgHistort.src = historyData.forecast.forecastday[index].day.condition.icon;

      let historyDay = document.getElementById("historyDay0" + tempIndex)
      historyDay.innerHTML = historyData.forecast.forecastday[index].date;

      let historyTemp = document.getElementById("historyTemp0" + tempIndex)
      historyTemp.innerHTML = historyData.forecast.forecastday[index].day.condition.text;



   }

   if (temperatureInput == "Celcious") {
      for (var index = 0; index < 7; index++) {
         var tempIndex = index;
         tempIndex++;


         let historyTemp = document.getElementById("historyTemp0" + tempIndex)
         historyTemp.innerHTML = historyData.forecast.forecastday[index].day.condition.text;

         let historyMin = document.getElementById("historyMin0" + tempIndex)
         historyMin.innerHTML = historyData.forecast.forecastday[index].day.mintemp_c + "°C";

         let historyMax = document.getElementById("historyMax0" + tempIndex)
         historyMax.innerHTML = historyData.forecast.forecastday[index].day.maxtemp_c + "°C";


      }
   } else {
      for (var index = 0; index < 7; index++) {
         var tempIndex = index;
         tempIndex++;

         let historyMin = document.getElementById("historyMin0" + tempIndex)
         historyMin.innerHTML = historyData.forecast.forecastday[index].day.mintemp_f + "°F";

         let historyMax = document.getElementById("historyMax0" + tempIndex)
         historyMax.innerHTML = historyData.forecast.forecastday[index].day.maxtemp_f + "°F";


      }
   }
}

function loadTime() {
   const d = new Date();
   dateTime01.innerHTML = d.toLocaleString();
}

setInterval(() => {
   loadTime();
}, 1000);

loadPage("sri lanka");




document.getElementById('togglebtn').addEventListener('click', () => {
   let mainRowClass = document.querySelector('.mainRow');
   let todayDetails = document.querySelectorAll('.todayDetails');
   let name = document.querySelectorAll('.name');
   let card01 = document.querySelectorAll('.card01');
   let cardTime = document.querySelectorAll('.cardTime');
   let cardTemp = document.querySelectorAll('.cardTemp');

   if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
      document.documentElement.setAttribute('data-bs-theme', 'light')

      mainRowClass.style.backgroundColor = '#C2D1D6';

      for (var i = 0; i < todayDetails.length; i++) {
         todayDetails[i].style.backgroundColor = '#85A4AD';
      }

      for (var i = 0; i < name.length; i++) {
         name[i].style.color = '#244853';
      }

      for (var i = 0; i < card01.length; i++) {
         card01[i].style.backgroundColor = '#5C8592';
      }

      for (var i = 0; i < cardTime.length; i++) {
         cardTime[i].style.backgroundColor = '#D9D9D9';
      }

      for (var i = 0; i < cardTemp.length; i++) {
         cardTemp[i].style.backgroundColor = '#D9D9D9';
      }


   }
   else {
      document.documentElement.setAttribute('data-bs-theme', 'dark')
      mainRowClass.style.backgroundColor = '#010808';
      for (var i = 0; i < todayDetails.length; i++) {
         todayDetails[i].style.backgroundColor = '#212529';
      }

      for (var i = 0; i < name.length; i++) {
         name[i].style.color = '#0482ac';
      }

      for (var i = 0; i < card01.length; i++) {
         card01[i].style.backgroundColor = '#022d3a';
      }

      for (var i = 0; i < cardTime.length; i++) {
         cardTime[i].style.backgroundColor = '#1b1a1a';
      }

      for (var i = 0; i < cardTemp.length; i++) {
         cardTemp[i].style.backgroundColor = '#1b1a1a';
      }


   }

});

document.getElementById('tempDropdown').addEventListener('change', () => {
   var tempSelect = document.getElementById('tempDropdown').value;
   loadForecastData(tempSelect);
   loadHistoryData(tempSelect)
});



document.getElementById('searchRegion').addEventListener('input', () => {
   var searchRegion = document.getElementById('searchRegion').value;
   if (searchRegion != "") {

      fetch("https://api.weatherapi.com/v1/search.json?key=10fd1d1e0ca24a2f99e101538242808&q=" + searchRegion)
         .then(data => data.json())
         .then(data => {
            var datalist = "";
            data.forEach(element => {
               datalist += `<option value="${element.name}" />`
            });

            region.innerHTML = datalist;
         })
         .catch(error => {
            console.log("fetch error")
            alert("Error in connecting. Please try again later")
              
          });
          
      var opt = document.getElementById('region').children;
      for (var i = 0; i < opt.length; i++) {
         if (opt[i].value == searchRegion) {
            loadPage(searchRegion)
            break;

         }
      }
   }

});

const options = {method: 'GET', headers: {accept: 'text/plain'}};

maptilersdk.config.apiKey = '8HLSaAqVVlNgnJYfj6iW';
      const map = (window.map = new maptilersdk.Map({
        container: 'map', // container's id or the HTML element to render the map
        style: maptilersdk.MapStyle.BACKDROP,
        zoom: 2,
        center: [0, 40]
      }));

      const timeInfoContainer = document.getElementById("time-info");
      const timeTextDiv = document.getElementById("time-text");
      const timeSlider = document.getElementById("time-slider");
      const playPauseButton = document.getElementById("play-pause-bt");
      const pointerDataDiv = document.getElementById("pointer-data");
      let pointerLngLat = null;

      const weatherLayer = new maptilerweather.WindLayer();

      map.on('load', function () {
        map.setPaintProperty("Water", 'fill-color', "rgba(0, 0, 0, 0.4)");
        map.addLayer(weatherLayer, 'Water');
      });

      timeSlider.addEventListener("input", (evt) => {
        weatherLayer.setAnimationTime(parseInt(timeSlider.value / 1000))
      });

      // Event called when all the datasource for the next days are added and ready.
      // From now on, the layer nows the start and end dates.
      weatherLayer.on("sourceReady", event => {
        const startDate = weatherLayer.getAnimationStartDate();
        const endDate = weatherLayer.getAnimationEndDate();
        const currentDate = weatherLayer.getAnimationTimeDate();
        refreshTime()

        timeSlider.min = +startDate;
        timeSlider.max = +endDate;
        timeSlider.value = +currentDate;
      });

      // Called when the animation is progressing
      weatherLayer.on("tick", event => {
        refreshTime();
        updatePointerValue(pointerLngLat);
      });

      // Called when the time is manually set
      weatherLayer.on("animationTimeSet", event => {
        refreshTime()
      });

      // When clicking on the play/pause
      let isPlaying = false;
      playPauseButton.addEventListener("click", () => {
        if (isPlaying) {
          weatherLayer.animateByFactor(0);
          playPauseButton.innerText = "Play 3600x";
        } else {
          weatherLayer.animateByFactor(3600);
          playPauseButton.innerText = "Pause";
        }

        isPlaying = !isPlaying;
      });

      // Update the date time display
      function refreshTime() {
        const d = weatherLayer.getAnimationTimeDate();
        timeTextDiv.innerText = d.toString();
        timeSlider.value = +d;
      }

      map.on('mouseout', function(evt) {
        if (!evt.originalEvent.relatedTarget) {
          pointerDataDiv.innerText = "";
          pointerLngLat = null;
        }
      });

      function updatePointerValue(lngLat) {
        if (!lngLat) return;
        pointerLngLat = lngLat;
        const value = weatherLayer.pickAt(lngLat.lng, lngLat.lat);
        if (!value) {
          pointerDataDiv.innerText = "";
          return;
        }
        pointerDataDiv.innerText = `${value.speedMetersPerSecond.toFixed(1)} m/s`
      }

      map.on('mousemove', (e) => {
        updatePointerValue(e.lngLat);
      });