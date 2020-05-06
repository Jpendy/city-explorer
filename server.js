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

    const newArr = [];
    for(let i = 0; i < 9; i++) {
        const item = weatherData.data[i];
    // return weatherData.data.map(item => {
        const object = {};
        object.forecast = item.weather.description;
        object.time = item.datetime;
        newArr.push(object)
    // })
    }
    return newArr;
}

function mungeLocation(data) {
    return data.map(item => {
        const object = {};
        object.formatted_query = item.display_name;
        object.latitude = item.lat;
        object.longitude = item.lon;
        return object;
    })
}

app.get('/location/', (req, res) => {

    const mungedResponse = mungeLocation(geoData);
    try {
        res.json(mungedResponse);        
    }  catch(e) {
        console.error(e);

        res.json({
           stats: 500,
           responseText: e 
        });
    }
})

app.get('/weather', (req, res) => {

    const mungedResponse = mungeWeather(weatherData);

    try {
        res.json(mungedResponse);        
    }  catch(e) {
        console.error(e);

        res.json({
           stats: 500,
           responseText: e 
        });
    }
});

app.get('*', (req, res) => {
    res.status(404).json({
    error: 'no such route!',
});
});

app.listen(PORT, () => { console.log(`listening on port ${PORT}`);});

