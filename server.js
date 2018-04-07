const express = require('express');
const app = express();

const _ = require('underscore');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

app.use(express.static('public'));
app.use('/angular', express.static('node_modules/angular/'));
app.use('/angular-clipboard', express.static('node_modules/angular-clipboard/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

// TODO: hide credentials
mongoose.connect('mongodb://admin:admin@ds135399.mlab.com:35399/url-shortener');

const Url = mongoose.model('Url', {
    id: Number,
    long: String,
    short: String
});

app.post('/api/urls', (req, res) => {
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
                    short: hash(maxId + 1)
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

const root = __dirname + '/public/';
app.get('/', (req, res) => {
    res.sendFile(path.join(root + 'index.html'));
});

app.get('/:short', (req, res) => {
    Url.findOne({ short: req.params.short }, (err, obj) => {
        if (err) {
            res.send(err);
        }

        if (!_.isNull(obj)) {
            res.redirect(obj.long);
        } else {
            res.sendFile(path.join(root + 'error.html'));
        }
    });
});

const PORT = 3000 | process.argv[2];
app.listen(PORT);

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