const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const PORT = process.env.PORT || 3000;
const dbName = process.env.DBNAME || 'instatube';

const MongoClient = require('mongodb').MongoClient;

module.exports = {
    MongoClient,
    MONGODB_URI,
    dbName,
    PORT
};