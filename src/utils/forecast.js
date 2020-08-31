const request = require('request');
const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/5bccb0e1292722639f6fa1d1cb85bda1/${latitude},${longitude}?units=si`
    request({url, json: true}, (err, {body}) => {
        callback(undefined, `${body.daily.data[0].summary}. It is currently ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`);
    })
}
module.exports = forecast;

