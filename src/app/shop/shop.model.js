var mongoose = require('mongoose');

var ShopSchema = new mongoose.Schema({
    code: Number,
    shop_name:String,
    client_name:String,
    email:String,
    tel:{type: Number},
    address: String,
	city: String,
	province: String,
    place:{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    process:{ type: mongoose.Schema.Types.ObjectId, ref: 'Process' },
});

module.exports = mongoose.model("Shop", ShopSchema),mongoose;