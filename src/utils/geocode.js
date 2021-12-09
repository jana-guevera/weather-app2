const request = require("postman-request");

const geocode = (location, callback) => {
    const geocodeURL = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + location +".json?access_token=pk.eyJ1IjoiamFuYWd1ZXZlcmEwNyIsImEiOiJja3F2YW91aGQwY250MnFvNnlmYWIxZ3drIn0.kEuq4uPgYr0FnBlNDv7pPw&limit=1";

    request({url: geocodeURL, json: true}, (error, response) => {
        if(error){
            callback("Unable to connect to geo location service.", undefined);
        }else if(response.body.features.length === 0){
            callback("Unable to find location. Please try another search", undefined);
        }else{
            const coordinates = {
                latitude: response.body.features[0].center[1],
                longitude:  response.body.features[0].center[0],
                location: response.body.features[0].place_name
            }

            callback(undefined, coordinates);
        }
    });
}

module.exports = geocode;