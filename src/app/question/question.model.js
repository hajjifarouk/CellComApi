var mongoose = require('mongoose');

var QuestionSchema = new mongoose.Schema({
    body: String,
    type:String,
    choices:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Choice' }]
});

module.exports = mongoose.model("Question", QuestionSchema);