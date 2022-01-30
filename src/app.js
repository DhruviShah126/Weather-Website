const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express configuration 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory for server
app.use(express.static(publicDirectoryPath))

// --- Setup different webpage locations ---

app.get('', (req, res) => { // the empty string is used for the home page (the web address without any /)
    res.render('index', {
        title: 'Weather App',
        name: 'Dhruvi Shah'
    })
})

app.get('/about', (req, res) => { // about page
    res.render('about', {
        title: 'About Me',
        name: 'Dhruvi Shah'
    })
})

app.get('/help', (req, res) => { // help page
    res.render('help', {
        title: 'Help Page',
        name: 'Dhruvi Shah',
        description: 'Feel free to contact us if you need any help!'
    })
})

app.get('/weather', (req, res) => { // weather page
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, ( error, { latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            res.send({
                forecast: forecastData, 
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => { // the * catches all other pages that we do not have something specifcally written out for
    res.render('404', {
        title: '404',
        name: 'Dhruvi Shah',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => { // the * catches all other pages that we do not have something specifcally written out for
    res.render('404', {
        title: '404',
        name: 'Dhruvi Shah',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => { // port 3000 is the port we set up the webpage on 
    console.log('Server is up on port 3000')
})