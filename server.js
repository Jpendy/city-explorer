const dotenv = require('dotenv');

dotenv.config();

const express = require('express');

const cors = require('cors');

const data = require('./data/weather.json');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());

function mungeWeather(data) {


}

app.get('/location', (req, res) => {

    try {
        const mungedResponse = mungeWeather(data);
        res.json(mungedResponse);        
    }  catch(e) {
        console.error(e);

        res.json({
           stats: 500,
           responseText: e 
        });
    }
})