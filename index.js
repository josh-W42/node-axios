// New stuff
require('dotenv').config();
// This gives us access to a .env file in folder. We need this to access API keys.
// It's important because you don't want your API key to be used

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

// LISTENER
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
})