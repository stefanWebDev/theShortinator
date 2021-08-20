var mongoose = require('mongoose');
var UrlDataSchema = new mongoose.Schema({
    shortUrl: {
        type: String,
        required: true
    },
    longUrl: {
        type: String,
        required: true
    }
});
var UrlData = mongoose.model('Product', UrlDataSchema);
module.exports = UrlData;
