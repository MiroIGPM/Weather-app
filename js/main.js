var destinationOutput = document.getElementById('destination-output')
var destinationOutputGraph = document.getElementById('destination-output-graph')

var departureOutput = document.getElementById('departure-output')
var departureOutputGraph = document.getElementById('departure-output-graph')

var departurePlace = document.getElementById('departure-search')
var destinationPlace = document.getElementById('destination-search')

console.log(departurePlace, destinationPlace)

async function getPlaces(){
  let result = await fetch('https://places.cit.api.here.com/places/v1/autosuggest?at=40.74917,-73.98529&q=banjaluka&app_id=h1mcLjwfKvXj6GeDXvtT&app_code=mAfuU_GW3TE4xn2wtXlMtw')
  let place = await result.json()
  let city = place.results[0].position
  console.log(city)
}



async function getWeatherApi(){
  var destinationLongitude = document.getElementById('destination_longitude') 
  var destinationLatitude = document.getElementById('destination_latitude')
  var departureLatitude = document.getElementById('departure_latitude')
  var departureLongitude = document.getElementById('departure_longitude')

  if(destinationLongitude.value && destinationLatitude.value != ""){
    latitude = destinationLatitude.value
    longitude = destinationLongitude.value

    destinationLatitude.value = ""
    destinationLongitude.value= ""
    
 }else if(departureLatitude.value && departureLongitude.value != ""){
   latitude = departureLatitude.value
   longitude = departureLongitude.value

   departureLatitude.value = ""
   departureLongitude.value = ""
 }

  // places api
  getPlaces()

    let response = await fetch(`https://api.met.no/weatherapi/locationforecast/1.9/?lat=${latitude};lon=${longitude}`)
    let str = await response.text()
    
    return str;    
}

function getData(){

  var target = event.target

    getWeatherApi().then(str => $.parseXML(str)).then(data => {
        const xmlD = data.getElementsByClassName('pointData')[0]
        const lastTime = xmlD.getElementsByTagName('time')[0].childNodes[1];
        
        const images = document.getElementsByTagName('img');
       

        var output = "";
        var graphOutput = "";

        lastTime.childNodes.forEach(element => {   

        let nodeName = element.nodeName
        

        if(nodeName == "temperature"){
            let temperature = element.getAttributeNode('value').value
            output += `<li><span>Temperature:</span><br> ${temperature} C</li>`
            }else if(nodeName == "humidity"){
             let humidity = element.getAttributeNode('value').value
             output += `<li><span>humidity:</span> ${humidity} </li>`
            }else if(nodeName == "dewpointTemperature"){
              let dew = element.getAttributeNode('value').value
              output += `<li><span>Dew:</span> ${dew}</li>`              
            }else if(nodeName == "fog"){
              let fog = element.getAttributeNode('percent').value
              graphOutput += `<div class="bottom-box">
                                    <h4 value=${fog} id="fog">Fog: ${fog}%</h4>                        
                                    <img id="sun" src="images/sun.svg"> 
                                </div>`
            }else if(nodeName == "lowClouds"){
             let lowClouds = element.getAttributeNode('percent').value
             graphOutput += `<div class="bottom-box">
                              <h4 value="${lowClouds}" id="cloud">Low clouds: ${lowClouds}%</h4>
                              <img src="images/sun.svg"> 
                            </div>`
           }else if(nodeName == "mediumClouds"){
             let mediumClouds = element.getAttributeNode('percent').value
             graphOutput += `<div class="bottom-box">
                              <h4>Medium clouds: ${mediumClouds}</h4>
                              <img src="images/sun.svg"> 
                           </div>`
           }else if(nodeName == "highClouds"){
             let highClouds = element.getAttributeNode('percent').value
             graphOutput += `<div class="bottom-box">
                                  <h4>High Clouds: ${highClouds}</h4>
                                  <img src="images/sun.svg"> 
                              </div>`
          }

         

        });
        if(target.id == "destination-button"){
          destinationOutput.innerHTML = output
          destinationOutputGraph.innerHTML = graphOutput
        }else if(target.id == "departure-button"){
          departureOutput.innerHTML = output
          departureOutputGraph.innerHTML = graphOutput
        }

      
})
}


