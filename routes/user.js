var express = require('express');
var router = express.Router();
const {MongoClient} = require('../config');
const {MONGODB_URI} = require('../config');
const {dbName} = require('../config');
const {ObjectId} = require('../config');

/* GET USERS */
router.get('/', async function(req, res) {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('user');
        //Display all datas of the collection
        let results = await col.find.sort({ _id: -1}).toArray();
        res.send({
            users: results
        });
    } catch (err) {
        res.send({
            error: err
        });
    }
    client.close();
});

/* PATCH A USER */
router.patch('/:id', async function(req, res) {
    const client = new MongoClient(MONGODB_URI, { useNewUrlParser: true });
    try {
        await client.connect();
        const db = client.db(dbName);
        const col = db.collection('user');
        const userId = req.params.id;
        const story = req.body.story;

        let users = await col.find().toArray();
        let founded = false;
        let storyToBeModified;
        users.forEach(function (user) {
            if (user.id === userId) {
                user.stories.forEach(function (story) {
                    if(story._id.equals(story.id)){
                        founded = true;
                        storyToBeModified = story;
                    }
                })
            }
        });
        
        if(story.id !== undefined) {
            res.status(400).send({ error: 'Aucun contenu n\'a été saisi' });
        } else if(!founded) {
            res.status(404).send({ error: 'Cet identifiant est inconnu' });
        } else {
            let insertResult = await col.updateOne(
                { _id: ObjectId(storyId) },
                {
                    $set: {
                        content
                    }
                });
            res.send({
                error: null
            });
        }
    } catch (err) {
        res.send({
            error: err
        });
    }
    client.close();
});

module.exports = {router};
