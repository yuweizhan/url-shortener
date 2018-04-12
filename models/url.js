const mongoose = require("mongoose");

const Url = mongoose.model('url', {
    id: Number,
    long: String,
    short: String
});

module.exports = Url;