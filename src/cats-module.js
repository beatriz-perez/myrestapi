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

function getCats() {
    return new Promise((resolve, reject) => {
        database.db().collection('cats').find().toArray((err, docs) => {
            if (err) {
                reject(err)
            } else {
                resolve(docs)
            }
        })
    })
}

function addCat(cat) {
    return new Promise((resolve, reject) => {
        database.db().collection('cats').insertOne(cat,(err, result) => {
            if (err) {
                reject(err)
            } else {
                resolve(result)
            }
        })
    })
};

function getCatById(id) {
    console.log('Finding cat', id);
    return new Promise((resolve, reject) => {
        database.db().collection('cats').findOne({
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

function deleteCatById(id) {
    return new Promise((resolve, reject) => {
        database.db().collection('cats').deleteOne({
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

function updateCatById(id, data) {
    return new Promise((resolve, reject) => {
        database.db().collection('cats').updateOne({
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
    getCats,
    addCat,
    getCatById,
    deleteCatById,
    updateCatById
};