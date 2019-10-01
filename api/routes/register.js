const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../model/user');

router.post('/', (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                return res.status(422).json({
                    Message: "Emial already registered"
                })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        return res.status(500).json({
                            error: err
                        });
                    } else {
                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            name: req.body.name,
                            email: req.body.email,
                            mobile: req.body.number,
                            password: hash
                        });
                        user.save().then(result => {
                            console.log(result);
                            const token = jwt.sign({
                                name: req.body.name,
                                email: req.body.email
                            }, 'secret',
                                {
                                    expiresIn: "1h"
                                });
                            res.status(200).json({
                                Message: 'User created',
                                Token: token,
                                Body: result
                            });
                        }).catch(err => {
                            console.log(err);
                            res.status(404).json({
                                Error: err
                            });
                        });
                    }
                })
            }
        })
});

module.exports = router;