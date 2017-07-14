// Bring Mongoose into the app 
var mongoose = require( 'mongoose' ); 

// Build the connection string 
var dbURI = 'mongodb://localhost:27017/node-login'; 

// Create the database connection 
mongoose.connect(dbURI); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});

// If the Node process ends, close the Mongoose connection 
process.on('SIGINT', function() {  
  mongoose.connection.close(function () { 
    console.log('Mongoose default connection disconnected through app termination'); 
    process.exit(0); 
  }); 
}); 

// BRING IN YOUR SCHEMAS & MODELS // For example 
require('./app/answer/answer.model.js');
require('./app/choice/choice.model.js');
require('./app/form/form.model.js');
require('./app/place/place.model.js');
require('./app/plan/plan.model.js');
require('./app/process/process.model.js');
require('./app/question/question.model.js');
require('./app/report/report.model.js');
require('./app/shop/shop.model.js');
require('./app/user/user.model.js');
require('./app/visit/visit.model.js');
