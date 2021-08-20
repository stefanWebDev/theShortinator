const mongoose = require('mongoose');

const UrlDataSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true
    },
    longUrl: {
        type: String,
        required: true,
    }
})

const UrlData = mongoose.model('Product', UrlDataSchema);

module.exports = UrlData;