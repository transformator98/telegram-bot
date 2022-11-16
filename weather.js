const express = require('express')
require('dotenv').config()
const weather = express()
const got = require('got')
const WEATHER_API = 'https://pro.openweathermap.org/data/2.5/forecast/hourly'
const lat = '49.066946'
const lon = '33.411369'
const apiKey = process.env.WEATHER_API

weather.get('/', async(req, res, next) => {

    try {
        const response = await got(`${WEATHER_API}`, {
            searchParams: {
                lat,
                lon,
                appid: apiKey,
            }
        })
        const data = JSON.parse(response.body)
        console.log('data', data)
        res.json(data)
    } catch (error) {
        next(error)
    }
})
weather()

module.exports = weather