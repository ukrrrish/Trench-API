const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const Item = require('../model/item');

router.post('/', (req, res, next) => {

    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        user_id: req.body.user_id,
        timestamp: req.body.timestamp,
        location: req.body.location,
        log_message: req.body.log_message,
        image_path: req.body.image_path,
        shared_to: req.body.shared_to
    });
    item.save().then(result => {
        res.status(200).json({
            Message: 'User created',
            Body: result
        });
    }).catch(err => {
        console.log(err);
        res.status(404).json({
            Error: err
        });
    });
});


router.post('/getitems', (req, res, next) => {

    Item.find({shared_to: {$elemMatch: {user_id : req.body.user_id}}}).then(result => {
        res.status(200).json({
            Message: 'Fedched Item',
            Body: result
        });
    }).catch(err => {
        console.log(err);
        res.status(404).json({
            Error: err
        });
    });
});

module.exports = router;