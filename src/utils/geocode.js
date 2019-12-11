const request = require('request')

const getGeocode = (location, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${location}.json?access_token=pk.eyJ1IjoibmFydGFudiIsImEiOiJjazN3NjZxcHYwdmlvM2RwdzcwcDNzOHhvIn0.oOKGvH2g3W9W6syzpcHUsA&limit=1`
    request({ url, json: true }, (err, { body }) => {
        if (err) {
            callback(`Unable to connect weather API`, undefined)
        }
        else if (body.features.length === 0) {
            callback(`Unable to find a location`, undefined)
        }
        else {
            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                place: body.features[0].place_name
            })
        }
    })
}

module.exports = getGeocode