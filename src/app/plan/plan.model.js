var mongoose = require('mongoose');

var PlanSchema = new mongoose.Schema({
	date: Date,
    user:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    visits:[{ type: mongoose.Schema.Types.ObjectId, ref: 'Visit' }],
});

module.exports = mongoose.model("Plan", PlanSchema);