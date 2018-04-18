const express = require('express');
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const index = require('./routes/index.route');
const api = require('./routes/api.route');

app.use(express.static('public'));
app.use('/scripts/angular', express.static('node_modules/angular/'));
app.use('/scripts/angular-clipboard', express.static('node_modules/angular-clipboard/'));
app.use('/styles/bulma', express.static('node_modules/bulma/css/'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': true}));

mongoose.connect('mongodb://localhost/url-shortener');

app.use('/', index);
app.use('/api', api);

const port = 3000 | process.argv[2];
app.listen(port);