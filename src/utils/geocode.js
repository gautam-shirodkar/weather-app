const request = require('request');

const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoidXNlci1nYXV0YW0iLCJhIjoiY2tlNGp0bWcwMHR0NzJ4cGRsYmdraW9ocSJ9.P0ZtkXxgA-7uv1uU_814RA&limit=1`
    request({url, json: true}, (err, {body}) => {
        const latitude = body.features[0].center[1];
        const longitude = body.features[0].center[0];
        const placeName = body.features[0].place_name;
        return callback(undefined, {
            placeName,
            latitude,
            longitude
        })
    })
}
module.exports = geoCode;
