const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = require('../model/user');

router.post('/', (req, res, next) => {

    User.find({ email: req.body.email })
        .exec()
        .then(user => {
            if (user.length === 0) {
                return res.status(422).json({
                    Message: "Invalid User Name or Password"
                })
            }
            bcrypt.compare(req.body.password, user[0].password,
                (err, result) => {
                    if (err) {
                        return res.status(401).json({
                            message: "Hash failed Invalid password"
                        });
                    }
                    if (result) {
                        return res.status(200).json({
                            message: "User Exist"
                        });
                    }
                    return res.status(401).json({
                        message: "User Failed"
                    });
                });
        }
        ).catch(err => {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        });
});

module.exports = router;