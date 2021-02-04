// New stuff
require('dotenv').config();
// This gives us access to a .env file in folder. We need this to access API keys.
// It's important because you don't want your API key to be used

const axios = require('axios');
// This is what we're using in order to make requests
// as opposed to the node-fetch module.

// Old stuff
const express = require('express');
const app = express();
const expressEjsLayouts = require('express-ejs-layouts');
const methodOveride = require('method-override');

// MIDDLEWARE

// EJS
app.set('view engine', 'ejs');
// EJS Layouts
app.use(expressEjsLayouts);
// Body parser for POST methods
app.use(express.urlencoded({extended: false}));
// method override for PUT and DELETE
app.use(methodOveride('_method'));

// ROUTES
app.get('/', (req, res) => {
    res.render('index.ejs');
});

// A new route that performs an api request
app.get('/omdb', (req, res) => {
    const query = {
        params: {
            s: 'star wars',
            apiKey: process.env.API_KEY
        }
    }

    axios.get('http://www.omdbapi.com', query)
    .then(response => {
        const data = response.data;
        res.render('search.ejs', { data });
    }).catch(error => {
        console.log(`An Error has occured, status: ${error.response.status} - ${error.response.statusText}`);
        res.send('An error has occured');
    });
});

// LISTENER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
})