async function getWeatherApi(){
    let response = await fetch(`https://api.met.no/weatherapi/locationforecast/1.9/?lat=30;lon=30`)
    let str = await response.text()
    
    return str;    
}

function getData(){
    getWeatherApi().then(str => $.parseXML(str)).then(data => {
        const xmlD = data.getElementsByClassName('pointData')[0]
        const lastTime = xmlD.getElementsByTagName('time')[0].childNodes[1];
        console.log(lastTime);
})
}

getData()