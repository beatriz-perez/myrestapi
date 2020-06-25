// Read environment variables
require('dotenv').config()

var express = require('express');
var bodyParser = require('body-parser');
var packageJSON = require('../package.json');
var catsModule = require('./cats-module');
const database = require('./database');

var app = express();

app.use(bodyParser());

app.get('/', function (req, res) {
    res.send({
        version: packageJSON.version,
        date: Date.now()
    });
});

app.get('/cats', function (req, res) {
    catsModule.getCats()
        .then(cats => {
            res.send(cats);
        })
        .catch(error => {
            res.status(500).send({
                error: error.message
            })
        })
});
app.post('/cats', function(req, res){
    catsModule.addCat(req.body)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send({
                error: error.message
            })
        })
});

app.get('/cats/:catId', function(req, res){
    catsModule.getCatById(req.params.catId)
        .then(result => {
            if(!result) {
                res.status(404).json({
                    error: 'Not Found'
                })
            }
            res.send(result);
        })
        .catch(error => {
            res.status(500).send({
                error: error.message
            })
        })
});

app.delete('/cats/:catId', function(req, res){
    catsModule.deleteCatById(req.params.catId)
        .then(result => {
            res.json({
                deleted: true
            })
        })
        .catch(error => {
            res.status(500).send({
                error: error.message
            })
        })
});

app.put('/cats/:catId', function(req, res){
    catsModule.updateCatById(req.params.catId, req.body)
        .then(result => {
            res.json({
                updated: true
            })
        })
        .catch(error => {
            res.status(500).send({
                error: error.message
            })
        })
});


// Connetc to DB

database.connect()
.then(() => {
    console.log('Database connected!')
    app.listen(3004, function () {
        console.log('Example app listening on port 3004!');
    });            
}) 
.catch (error => {
    console.error('Error connecting to DB');
    console.error(error.message);
})
