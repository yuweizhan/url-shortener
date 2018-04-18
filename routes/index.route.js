const express = require("express");
const router = express.Router();
const path = require('path');
const _ = require("underscore");

const Url = require("../models/url");

const publicRoot = `${__dirname}/../public/`;

router.get('/', (req, res) => {
    res.sendFile(path.join(publicRoot, 'index.html'));
});

router.get('/:short', (req, res) => {
    Url.findOne({ short: req.params.short }, (err, obj) => {
        if (err) {
            res.send(err);
        }

        if (!_.isNull(obj)) {
            res.redirect(obj.long);
        } else {
            res.sendFile(path.join(publicRoot, 'error.html'));
        }
    });
});

module.exports = router;