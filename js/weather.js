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

let forecastData;
let historyData;

function loadPage() {
   fetch("http://api.weatherapi.com/v1/forecast.json?key=10fd1d1e0ca24a2f99e101538242808&q=sri lanka&days=4&alerts=yes")
      .then(data => data.json())
      .then(data => {
         forecastData = data;
      }).then(function (json) {
         loadForecastData("Celcius");
      })

   fetch("http://api.weatherapi.com/v1/history.json?key=10fd1d1e0ca24a2f99e101538242808&q=sri lanka&dt=2024-08-27&end_dt=2024-09-02")
      .then(data => data.json())
      .then(data => {
         historyData = data;
      }).then(function (json) {
         loadHistoryData("Celcius")
      })


}

function loadForecastData(temperatureInput) {
   dateTime01.innerHTML = forecastData.location.localtime;
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
      imgForecast.src = forecastData.forecast.forecastday[index + 1].day.condition.icon;

      let forecastDay = document.getElementById("forecastDay0" + tempIndex)
      forecastDay.innerHTML = forecastData.forecast.forecastday[index + 1].date;

      let forecastTemp = document.getElementById("forecastTemp0" + tempIndex)
      forecastTemp.innerHTML = forecastData.forecast.forecastday[index + 1].day.condition.text;



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



   if (temperatureInput == "Celcius") {
      temperature.innerHTML = forecastData.current.temp_c + "°C";
      feelTemperature.innerHTML = forecastData.current.feelslike_c + "°C";

      for (var index = 0; index < 3; index++) {
         var tempIndex = index;
         tempIndex++;

         let tempMin = document.getElementById("tempMin0" + tempIndex)
         tempMin.innerHTML = forecastData.forecast.forecastday[index + 1].day.mintemp_c + "°C";

         let tempMax = document.getElementById("tempMax0" + tempIndex)
         tempMax.innerHTML = forecastData.forecast.forecastday[index + 1].day.maxtemp_c + "°C";

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
         tempMin.innerHTML = forecastData.forecast.forecastday[index + 1].day.mintemp_f + "°F";

         let tempMax = document.getElementById("tempMax0" + tempIndex)
         tempMax.innerHTML = forecastData.forecast.forecastday[index + 1].day.maxtemp_f + "°F";

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

   if (temperatureInput == "Celcius") {
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



loadPage();




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

})