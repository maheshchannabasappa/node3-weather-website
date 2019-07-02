const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsDirectoryPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsDirectoryPath)
hbs.registerPartials(partialsPath)

// setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name:'Mahesh'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title:'About Me',
        name:'Mahesh'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Mahesh'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error:'No Address?'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return  res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
          })
    })

    // res.send({
    //     Location: req.query.address,
    //    // forecast: 'It is 30 degrees outside'
    // })
})

app.get('/help/*', (req,res) => {
    res.render('error', {
        title:'Help article not found',
        name:'Mahesh'
    })
})

app.get('*', (req, res) => {
    res.render('error',{
        title:'Page not found',
        name: 'Mahesh'
    })
})

app.listen(3000, () => {
    console.log('Server is running on port 3000')
})