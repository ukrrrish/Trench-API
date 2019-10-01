const express = require('express');
const morgon = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const app = express();

const registerRoutes = require('./api/routes/register')
const signInRoutes = require('./api/routes/signIn')
const itemRoutes = require('./api/routes/item')
const imageUploadRoutes = require('./api/routes/imageupload')

mongoose.connect('mongodb+srv://udaykrishna:gUTTULA35@trench-db-ycigh.mongodb.net/test?retryWrites=true&w=majority',
    {
        useMongoClient: true
    });

app.use(morgon('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Method", 'PUT,POST,DELETE,PATCH,GET');
    }
    next();
});

app.use('/signin', signInRoutes);
app.use('/register', registerRoutes);
app.use('/item', itemRoutes);
app.use('/uploadimage',imageUploadRoutes);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500).json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;