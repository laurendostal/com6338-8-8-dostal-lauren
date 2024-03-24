var weatherURLfirstpart = 'https://api.openweathermap.org/data/2.5/weather?q='
var appId = '&appid=a1e5c995547a69253016f38705d20293'
var unitParameter = "&units=imperial"
var weatherDiv = document.getElementById('weather-app')
var formElement = document.querySelector('form')
var input = document.getElementById('weather-search')
var sectionElement = document.getElementById('weather')

formElement.onsubmit = function(e) {
    e.preventDefault()
    var searchTerm = input.value.trim()
    if(!searchTerm) {
        return
    }
    input.value = ""
    weatherURL = weatherURLfirstpart + searchTerm + unitParameter + appId
    fetch(weatherURL)
    .then(function(res) {
        if(res.status !== 200) {
            throw new Error('Location not found')
        }
        return res.json()
    })
    .then(function(weatherData) {
        renderWeatherInfo(weatherData)
    })
    .catch(function(err) {
        renderErrorInfo(err)
    })
}

function renderErrorInfo(err) {
    sectionElement.innerHTML = ""
    var h2 = document.createElement('h2')
    h2.textContent = err.message
    sectionElement.appendChild(h2)
}

function renderWeatherInfo(weatherData) {
    sectionElement.innerHTML = ""
    var h2 = document.createElement('h2')
    h2.textContent = weatherData.name + ", " + weatherData.sys.country
    sectionElement.appendChild(h2)
    var mapURL = "https://www.google.com/maps/search/?api=1&query="
    mapURL = mapURL + weatherData.coord.lat + "," + weatherData.coord.lon
    
    var anchor = document.createElement("a")
    anchor.href = mapURL
    anchor.target = "_blank"
    anchor.text = "Click to view map"
    sectionElement.appendChild(anchor)

    var weatherIconImgElement = document.createElement("img")
    var weatherIconCode = weatherData.weather[0].icon
    var weatherIconFileName = weatherIconCode + "@2x.png"
    var weatherIconURL = "https://openweathermap.org/img/wn/"
    weatherIconURL = weatherIconURL + weatherIconFileName
    weatherIconImgElement.src = weatherIconURL
    sectionElement.appendChild(weatherIconImgElement)

    var weatherDescriptionParaElement = document.createElement("p")
    var weatherDescription = weatherData.weather[0].description
    weatherDescriptionParaElement.style = "text-transform : capitalize;"
    var textNode = document.createTextNode(weatherDescription)
    weatherDescriptionParaElement.appendChild(textNode)
    sectionElement.appendChild(weatherDescriptionParaElement)

    sectionElement.appendChild(document.createElement('br'))

    var weatherCurrentTempParaElement = document.createElement("p")
    var weatherCurrentTemp = weatherData.main.temp
    var textNode = document.createTextNode("Current: " + weatherCurrentTemp + "° F")
    weatherCurrentTempParaElement.appendChild(textNode)
    sectionElement.appendChild(weatherCurrentTempParaElement)

    var weatherFeelsLikeTempParaElement = document.createElement("p")
    var weatherFeelsLikeTemp = weatherData.main.feels_like
    var textNode = document.createTextNode("Feels like: " + weatherFeelsLikeTemp + "° F")
    weatherFeelsLikeTempParaElement.appendChild(textNode)
    sectionElement.appendChild(weatherFeelsLikeTempParaElement)

    sectionElement.appendChild(document.createElement('br'))

    var weatherLastUpdatedParaElement = document.createElement("p")
    var weatherLastUpdated = weatherData.dt
    
    var date = new Date(weatherLastUpdated * 1000)
    var timeString = date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    })
    var textNode = document.createTextNode("Last updated: " + timeString)
    weatherLastUpdatedParaElement.appendChild(textNode)
    sectionElement.appendChild(weatherLastUpdatedParaElement)
}