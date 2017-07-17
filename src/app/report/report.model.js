var mongoose = require('mongoose');

var ReportSchema = new mongoose.Schema({
    ref: String,
    date:Date,
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    shop:{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    form:{ type: mongoose.Schema.Types.ObjectId, ref: 'Form' },
    answers:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    process:{ type: mongoose.Schema.Types.ObjectId, ref: 'Process' },
    imgs: [{ data: Buffer, contentType: String }],
});
module.exports = mongoose.model("Report", ReportSchema);