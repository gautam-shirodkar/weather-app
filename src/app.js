const express = require('express');
const path = require('path');
const app = express();
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicPath));
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Gautam Shirodkar'
    });
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'Gautam Shirodkar'
    });
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'Contact support for any help',
        name: 'Gautam Shirodkar'
    });
})
app.get('/weather', (req, res) => {
    const address = req.query.search;
    if (!address) {
        return res.send({
            error: 'Provide an address'
        })
    }

    geocode(address, (err, {latitude, longitude, placeName: location} = {}) => {

        forecast(latitude, longitude, (err, data) => {
            console.log(location);
            console.log(data);
            return res.send({
                location,
                data
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Article not found',
        name: 'Gautam Shirodkar'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Page Not Found',
        name: 'Gautam Shirodkar'
    })
})
app.listen(3000, () => {
    console.log('Server started on port 3000');
})