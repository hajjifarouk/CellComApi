var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    first_name: String,
    last_name:String,
    email:String,
    tel:Number,
    isActive:Boolean,
    isOnline:Boolean,
    img: { data: Buffer, contentType: String },
    temp_password	: String,
	temp_password_time: String,
    place:{ type: mongoose.Schema.Types.ObjectId, ref: 'Place' },
    process:{ type: mongoose.Schema.Types.ObjectId, ref: 'Process' },
    role:String
});

module.exports = mongoose.model("User", UserSchema),mongoose;