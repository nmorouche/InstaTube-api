var express = require('express');
var router = express.Router();
const { MongoClient } = require('../config');
const { MONGODB_URI } = require('../config');
const { dbName } = require('../config');

/* Get all shorts */
router.get('/all', async function(req, res) {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        const database = client.db("instatube");
        const shortCollection = database.collection("short");

        const shortData = await shortCollection.find().toArray();

        res.send({
            shorts: shortData
        });
    } catch (err) {
        res.send({
            error: err
        });
    }
    client.close();
});

/* Get a short from its ID */
router.get('/:id', async function(req, res) {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        const database = client.db("instatube");
        const shortCollection = database.collection("short");
        const shortId = parseInt(req.params.id);

        const shortData = await shortCollection.find({ id: shortId }).toArray();

        res.send({
            short: shortData
        });
    } catch (err) {
        res.send({
            error: err
        });
    }
    client.close();
});

/* Like a short by giving the shortId in URL */
router.patch('/like/:shortId', async function(req, res) {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        const database = client.db("instatube");
        const shortCollection = database.collection("short");
        const shortId = parseInt(req.params.shortId);

        var short = await shortCollection.find({ id: shortId }).toArray();
        if (short.length === 0) {
            res.status(404).send({ error: 'Cet identifiant est inconnu' });
        }

        await shortCollection.updateOne(
            { id: shortId },
            {
                $set: {
                    liked: !short[0].liked
                }
            }
        );

        res.send({
            success: true
        });
    } catch (err) {
        res.send({
            success: false
        });
    }

    client.close();
});

module.exports = {router};
