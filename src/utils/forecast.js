const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=437d6f5d0a0eb6aae0278828fa553920&query=' + latitude + ',' + longitude + '&units=f'
    request({ url, json: true}, (error, { body }) => {
        if (error) {                // will run if there is an error like no internet connection
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {    // will run if something like invalid location was provided
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 'It is ' + body.current.weather_descriptions[0] + '. The current temperature is ' + body.current.temperature 
            + ' °F and it feels like ' + body.current.feelslike + ' °F. The humidity is ' + body.current.humidity + '%.' )
        }
    })
}

module.exports = forecast