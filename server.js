const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

mongoose.connect('mongodb://admin:admin@ds135399.mlab.com:35399/url-shortener');

const Url = mongoose.model('Url', {
    url: String,
    shortenedUrl: String
});

app.post('/api/urls', (req, res) => {
    Url.create({
        url: req.body.url,
        shortenedUrl: req.body.url
    }, (err, obj) => {
        if (err) {
            res.send(err);
        }

        res.json(obj);
    });
});

app.get('/api/urls/:shortenedUrl', (req, res) => {
    Url.findOne({shortenedUrl: req.params.shortenedUrl}, (err, obj) => {
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