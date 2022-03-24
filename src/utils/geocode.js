const request = require('request')

const geocode = (address, callback) => {
    const useAddress = address.substr(0, address.length - 1);
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(useAddress) + '.json?access_token=pk.eyJ1IjoiZGhydXZpczIwMDIiLCJhIjoiY2t2Nzhwa2tqMTIwczJwbndjNXh1Y2JmZCJ9.udx52VzPFlNnWRUlXgL87g&limit=1'
    request({ url, json: true }, (error, { body }) => {
        if (error) {                               // will run if no internet connection or an error like that was the issue
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length === 0) {   // will run if invalid input 
            callback('Unable to find location. Try another search', undefined)
        } else {
            callback(undefined, { 
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode