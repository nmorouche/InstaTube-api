var express = require('express');
var router = express.Router();
const { MongoClient } = require('../config');
const { MONGODB_URI } = require('../config');
const { dbName } = require('../config');

/* Get all stories from all users */
router.get('/all', async function(req, res) {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        const database = client.db("instatube");
        const userCollection = database.collection("user");
        const shortCollection = database.collection("short");

        const userData = await userCollection.find().toArray();
        const shortData = await shortCollection.find().toArray();

        res.send({
            users: userData,
            shorts: shortData
        });
    } catch (err) {
        res.send({
            error: err
        });
    }
    client.close();
});

/* Get all stories from a specific user */
router.get('/:id', async function(req, res) {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        const database = client.db("instatube");
        const userCollection = database.collection("user");
        const shortCollection = database.collection("short");
        const userId = parseInt(req.params.id);

        const userData = await userCollection.find({ id: userId }).toArray();

        res.send({
            user: userData
        });
    } catch (err) {
        res.send({
            error: err
        });
    }
    client.close();
});

/* Like a story by giving UserId and then StoryId in URL */
router.patch('/like/:userId/:storyId', async function(req, res) {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();

        const database = client.db("instatube");
        const userCollection = database.collection("user");
        const userId = parseInt(req.params.userId);
        const storyId = parseInt(req.params.storyId);

        var user = await userCollection.find({ id: userId }).toArray();
        if (user.length === 0) {
            res.status(404).send({ error: 'Cet identifiant est inconnu' });
        }

        for (let i = 0; i < user[0].stories.length; i++) {
            if (user[0].stories[i].id === storyId) {
                user[0].stories[i].liked = !user[0].stories[i].liked
            }
        }

        await userCollection.updateOne(
            { id: userId },
            {
                $set: {
                    stories: user[0].stories
                }
            }
        );

        res.send({
            success: true
        });
    } catch (err) {
        res.send({
            error: err
        });
    }

    client.close();
});

/* Mark a story as seen by giving the userId and then the storyId */
router.patch('/seen/:userId/:storyId', async function(req, res) {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true,useUnifiedTopology: true });
    try {
        await client.connect();

        const database = client.db("instatube");
        const userCollection = database.collection("user");
        const userId = parseInt(req.params.userId);
        const storyId = parseInt(req.params.storyId);

        var user = await userCollection.find({ id: userId }).toArray();
        if (user.length === 0) {
            res.status(404).send({ error: 'Cet identifiant est inconnu' });
        }

        for (let i = 0; i < user[0].stories.length; i++) {
            if (user[0].stories[i].id === storyId) {
                user[0].stories[i].seen = true
            }
        }

        await userCollection.updateOne(
            { id: userId },
            {
                $set: {
                    stories: user[0].stories
                }
            }
        );

        res.send({
            success: true
        });
    } catch (err) {
        res.send({
            error: err
        });
    }

    client.close();
});

module.exports = {router};
