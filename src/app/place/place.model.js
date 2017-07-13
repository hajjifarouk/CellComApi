var mongoose = require('mongoose');

var PlaceSchema = new mongoose.Schema({
    longitude: Float,
    latitude:Float,
});

module.exports = mongoose.model("Place", PlaceSchema);