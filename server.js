const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const _ = require('underscore');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

mongoose.connect('mongodb://admin:admin@ds135399.mlab.com:35399/url-shortener');

const Url = mongoose.model('Url', {
    id: Number,
    long: String,
    short: String
});

app.post('/api/urls', (req, res) => {
    Url.findOne(
        {},
        null,
        {
            sort: {
                id: -1
            }    
        },
        (err, obj) => {
            if (err) {
                res.send(err);
            }
            
            if (!_.isNull(obj)) {
                maxId = obj.id;

                Url.create({
                    id: maxId + 1,
                    long: req.body.long,
                    short: hash(maxId + 1)
                }, (err, obj) => {
                    if (err) {
                        res.send(err);
                    }

                    res.json(obj);
                });
            }
        }
    );
});

app.get('/api/url/:short', (req, res) => {
    Url.findOne({short: req.params.short}, (err, obj) => {
        if (err) {
            res.send(err);
        }

        res.json(obj);
    });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.listen(3000);

function hash(id) {
    const digits = [];

    while (id > 0) {
        const remainder = id % 62;
        digits.unshift(remainder);
        id = Math.floor(id / 62);
    }

    let short = "";
    digits.forEach((digit) => {
        let char;
        if (digit >= 0 && digit <= 25) {
            char = String.fromCharCode(digit + 97);
        } else if (digit >= 26 && digit <+ 51) {
            char = String.fromCharCode(digit + 39);
        } else {
            char = (digit - 52) + "";
        }

        short += char;
    });

    return short;
}