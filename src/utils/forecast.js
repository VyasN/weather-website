const request = require('request')

const getCurrentForcast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/61fa05e2d2630e5b2f3f3da2c2692b55/${latitude},${longitude}?lang=en`
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback(`Unable to connect to dark sky API`, undefined)
        }
        else if (body.error) {
            callback(`Unable to find longitude and latitude`, undefined)
        }
        else {
            const fernhit = body.currently.temperature
            const celcius = (5 / 9) * (fernhit - 32)
            const celciusDouble = Math.round(celcius * 100) / 100
            callback(undefined, (`${body.daily.data[0].summary}, rain possibility is ${body.currently.precipProbability}% and  temperature is ${celciusDouble} degrees`))
        }
    })
}

module.exports = getCurrentForcast