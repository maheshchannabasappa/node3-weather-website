const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/d9494364a8784ca21bb4203b2b74e632/' + latitude + ','+longitude+'?units=si'

    request({ url, json:true}, (error,{ body }) => {
        if (error) {
            callback('Unable to connect to weather service!',undefined)
        } else if (body.error) {
            callback(body.error,undefined)     
        } else {
            callback(undefined,'It is currently ' + body.currently.temperature + ' degrees out. There is a '+ body.currently.precipProbability+ '% chance of rain')
        }
    })
}

module.exports = forecast
