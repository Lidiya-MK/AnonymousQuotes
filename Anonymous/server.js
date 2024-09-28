require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const quoteRoutes = require('./route/quoteRoutes');
const path= require('path');
const bodyParser= require('body-parser');

const app = express();

app.use(bodyParser.json());


app.set('view engine', 'hbs');


app.set('views', path.join(__dirname, 'views'));


app.use(express.static(path.join(__dirname, 'public')));

const db = process.env.MONGO_DB;

mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Your MongoDB has been connected successfully!");
}).catch((err) => {
    console.error("Unable to connect to your database:", err);
});

app.use('/anonymous', quoteRoutes);

app.get('/', (req, res) => {
    res.render('home'); 
});


app.get('/addquote.hbs', (req, res) => {
    res.render('addQuote');
});


app.use('/anonymous', quoteRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
