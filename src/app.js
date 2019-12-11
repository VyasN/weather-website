const express = require('express')
const path = require('path')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forcast = require('./utils/forecast')
const port = process.env.PORT || 3000

// Define paths for Express config
const _publicDirPath = path.join(__dirname, '../public')
const _viewsPath = path.join(__dirname, '../templates/views')
const _partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and view location
app.set('view engine', 'hbs');
app.set('views', _viewsPath)
hbs.registerPartials(_partialsPath)

// Setup static directory 
app.use(express.static(_publicDirPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Nartan Vyas'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Nartan Vyas'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Nartan Vyas'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Provide address/location to get weather update'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
        if (error) {
            return res.send({ error });
        }
        forcast(latitude, longitude, (error, forcastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forcast: forcastData,
                location: place,
                address: req.query.address
            })
        })
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nartan Vyas',
        errorMessage: 'help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Nartan Vyas',
        errorMessage: 'Page not found.'
    })
})
app.listen(port, () => {
    console.log(`Server is up and running on port ${port}.`);
})