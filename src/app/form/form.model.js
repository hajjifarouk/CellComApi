var mongoose = require('mongoose');

var FormSchema = new mongoose.Schema({
    ref:String,
    title: String,
    description:String,
    questions:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    process:{ type: mongoose.Schema.Types.ObjectId, ref: 'Process' },
});
module.exports = mongoose.model("Form", FormSchema);