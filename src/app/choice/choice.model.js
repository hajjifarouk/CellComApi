var mongoose = require('mongoose');

var ChoiceSchema = new mongoose.Schema({
    value: String,
    type:String
});

module.exports = mongoose.model("Choice", ChoiceSchema);