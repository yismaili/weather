let today= new Date();

document.getElementById('the3day').innerText = (today.getDate() + 2)+'/'+(today.getMonth()+1);



let lat =  33.589886;
let lng = -7.603869;
let appId = '98425e8fcccd2d9acfec8dfc91f5f2ad';


getWeather();
function getWeather(){ 
	let url=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&exclude=hourly,minutely&appid=${appId}&units=metric`;
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url);
	xhr.send();


	xhr.onload = function() {

	  if (xhr.status != 200) { 
	    alert(xhr.response);
	  } else { 
	   	let response = JSON.parse(xhr.response);
	   	// TODAY 
	   	let current = response.current
		initData("today", current.weather[0].main ,current.temp, current.humidity, current.wind_speed);
		// Tomorrow

		let tomorrow = response.daily[1];

		initData("tomorrow", tomorrow.weather[0].main,tomorrow.temp.day, tomorrow.humidity, tomorrow.wind_speed);

		// After Tomorrow
		let afterTomorrow = response.daily[2];

		initData("afterTomorrow", afterTomorrow.weather[0].main,afterTomorrow.temp.day, afterTomorrow.humidity, afterTomorrow.wind_speed);

	  }
	};


	
}

function initData(el, status, temp, hum, speed) {
 let divEl = document.getElementById(el);
 let tempEl = divEl.querySelector(".Weather-tenp");
 let softnesEl = divEl.querySelector(".Weather-softnes");
 let windEl = divEl.querySelector(".Weather-wind");
 let iconStatus = divEl.querySelector(".wi");

 tempEl.innerText= Math.floor(temp)+' °C';
 softnesEl.innerText= hum+' %';
 windEl.innerText= speed+' Km/h';
 if ("Clear"===status) {
 	iconStatus.classList.add("wi-day-sunny")
 }else if ("rain-sunny"===status) {
 	iconStatus.classList.add("wi-day-rain-mix")
 }else if ("rain"===status) {
 	iconStatus.classList.add("wi-day-rain")
 }else if ("Clouds"===status) {
 	iconStatus.classList.add("wi-day-cloudy-high")
 }

}

