var destinationOutput = document.getElementById('destination-output')
var destinationOutputGraph = document.getElementById('destination-output-graph')

async function getWeatherApi(){
    let response = await fetch(`https://api.met.no/weatherapi/locationforecast/1.9/?lat=30;lon=30`)
    let str = await response.text()
    
    return str;    
}

function getData(){
    getWeatherApi().then(str => $.parseXML(str)).then(data => {
        const xmlD = data.getElementsByClassName('pointData')[0]
        const lastTime = xmlD.getElementsByTagName('time')[0].childNodes[1];
        
        var output = "";
        var graphOutput = "";

        lastTime.childNodes.forEach(element => {   

        let nodeName = element.nodeName
        console.log(nodeName)

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
                                  <h4>FOG</h4>
                                  <h4>${fog}</h4>
                                </div>`
            }else if(nodeName == "lowClouds"){
             let lowClouds = element.getAttributeNode('percent').value
             graphOutput += `<div class="bottom-box">
                              <h4>Low clouds</h4>
                              <h4>${lowClouds}</h4>
                            </div>`
           }else if(nodeName == "mediumClouds"){
             let mediumClouds = element.getAttributeNode('percent').value
             graphOutput += `<div class="bottom-box">
                              <h4>Medium clouds</h4>
                              <h4>${mediumClouds}</h4>
                           </div class="bottom-box">`
           }else if(nodeName == "highClouds"){
             let highClouds = element.getAttributeNode('percent').value
             graphOutput += `<div class="bottom-box">
                                  <h4>High Clouds</h4>
                                  <h4>${highClouds}</h4>
                              </div>`
          }
        });
        destinationOutput.innerHTML = output
        destinationOutputGraph.innerHTML = graphOutput
})
}

getData();