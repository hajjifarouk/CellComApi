var mongoose = require('mongoose');

var AnswerSchema = new mongoose.Schema({
    text:String,
    questions:{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' },
});
module.exports = mongoose.model("Answer", AnswerSchema);