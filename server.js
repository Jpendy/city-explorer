const dotenv = require('dotenv');

dotenv.config();

const express = require('express');

const cors = require('cors');

const weatherData = require('./data/weather.json');
const geoData = require('./data/geo.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

function mungeWeather(weatherData) {
    return weatherData.map(item => {
        const object = {};
        object.forecast = item.description;
        object.time = item.datetime;
        return object;
    })



}

app.get('/location', (req, res) => {

    try {
        const mungedResponse = mungeWeather(weatherData);
        res.json({test:'hi'});        
    }  catch(e) {
        console.error(e);

        res.json({
           stats: 500,
           responseText: e 
        });
    }
})

app.get('/weather', (req, res) => {
    res.json([
        {
            forecast: 'Partly cloudy until afternoon.',
            time: 'Mon Jan 01 2001',
        },
        {
            forecast: 'Mostly cloudy in the morning.',
            time: 'Tue Jan 02 2001',
        },
    ]);


});

app.get('*', (req, res) => {
    res.status(404).json({
    error: 'no such route!',
});
});

app.listen(PORT, () => { console.log(`listening on port ${PORT}`);});

