const express = require("express");
const router = express.Router();
const _ = require("underscore");

const Url = require("../models/url");
const UrlService = require("../services/url.service");

router.post('/urls', (req, res) => {
    const long = req.body.long;

    Url.findOne({ long: long }, (err, obj) => {
        if (err) {
            res.send(err);
        }

        if (_.isNull(obj)) {
            Url.findOne({}, null, { sort: { id: -1 } }, (err, obj) => {
                if (err) {
                    res.send(err);
                }

                const maxId = _.isNull(obj) ? 0 : obj.id;

                Url.create({
                    id: maxId + 1,
                    long: long,
                    short: UrlService.hash(maxId + 1)
                }, (err, obj) => {
                    if (err) {
                        res.send(err);
                    }

                    res.json(obj);
                });
            });
        } else {
            res.json(obj);
        }
    });
});

module.exports = router;