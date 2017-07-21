var mongoose = require('mongoose');

var VisitSchema = new mongoose.Schema({
	status: Boolean,
    shop:{ type: mongoose.Schema.Types.ObjectId, ref: 'Shop' },
    process:{ type: mongoose.Schema.Types.ObjectId, ref: 'Process' }
});

module.exports = mongoose.model("Visit", VisitSchema),mongoose;