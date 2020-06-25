
const MongoClient = require('mongodb').MongoClient;

const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

const uri = `mongodb+srv://${user}:${password}@cluster-euw-htnnr.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });


function connect() {
    return client.connect();
}

module.exports = {
    connect,
    db: () => {
        return client.db(dbName)
    }
}