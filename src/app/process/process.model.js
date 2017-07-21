var mongoose = require('mongoose');

var ProcessSchema = new mongoose.Schema({
    name: String,
    description:String,
    chef:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model("Process", ProcessSchema),mongoose;