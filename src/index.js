// Read environment variables
require('dotenv').config()

var express = require('express');
var bodyParser = require('body-parser');
var packageJSON = require('../package.json');
var tasksModule = require('./tasks-module');
const database = require('./database');

var app = express();

app.use(bodyParser());

app.get('/', function (req, res) {
    res.send({
        version: packageJSON.version,
        date: Date.now()
    });
});

app.get('/tasks', function (req, res) {
    tasksModule.getTasks()
        .then(tasks => {
            res.send(tasks);
        })
        .catch(error => {
            res.status(500).send({
                error: error.message
            })
        })
});
app.post('/tasks', function(req, res){
    tasksModule.addTask(req.body)
        .then(result => {
            res.send(result);
        })
        .catch(error => {
            res.status(500).send({
                error: error.message
            })
        })
});

app.get('/tasks/:taskId', function(req, res){
    tasksModule.getTaskById(req.params.taskId)
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

app.delete('/tasks/:taskId', function(req, res){
    tasksModule.deleteTaskById(req.params.taskId)
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

app.put('/tasks/:taskId', function(req, res){
    tasksModule.updateTaskById(req.params.taskId, req.body)
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

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
database.connect()
.then(() => {
    console.log('Database connected!')
    app.listen(port, function () {
        console.log('Example app listening on port 8000!');
    });            
}) 
.catch (error => {
    console.error('Error connecting to DB');
    console.error(error.message);
})
