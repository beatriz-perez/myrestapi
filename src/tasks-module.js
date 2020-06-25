var database = require('./database');
var mongodb = require('mongodb');
// let cats = [
//     {
//         name: 'missifu',
//         family: 'european common cat',
//         picture: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/European_shorthair_procumbent_Quincy.jpg'
//     },
//     {
//         name: 'minino',
//         family: 'european common cat',
//         picture: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/European_shorthair_procumbent_Quincy.jpg'
//     }
// ];

function getTasks() {
    return new Promise((resolve, reject) => {
        database.db().collection('tasks').find().toArray((err, docs) => {
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
        })
    })
}

function addTask(task) {
    return new Promise((resolve, reject) => {
        database.db().collection('tasks').insertOne(task,(err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};

function getTaskById(id) {
    console.log('Finding task', id);
    return new Promise((resolve, reject) => {
        database.db().collection('tasks').findOne({
            _id: new mongodb.ObjectID(id)
        },(err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};

function deleteTaskById(id) {
    return new Promise((resolve, reject) => {
        database.db().collection('tasks').deleteOne({
            _id: new mongodb.ObjectID(id)
        },(err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};

function updateTaskById(id, data) {
    return new Promise((resolve, reject) => {
        database.db().collection('tasks').updateOne({
            _id: new mongodb.ObjectID(id)
        }, { $set: data }, (err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};


module.exports = {
    getTasks,
    addTask,
    getTaskById,
    deleteTaskById,
    updateTaskById
};