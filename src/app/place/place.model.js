var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
    longitude: Number,
    latitude:Number,
});

module.exports = mongoose.model("Place", PlaceSchema);