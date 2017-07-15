const express    = require('express');        
const app        = express();                
const bodyParser = require('body-parser');
const logger 	   = require('morgan');
const router 	   = express.Router();
const port 	   = process.env.PORT || 1337;
const db = require('./src/mongoose.db.js');

app.use(bodyParser.json());
//app.use(logger('dev'));
require('./src/routes')(router);
app.use('/', router);

app.listen(port);

console.log(`App Runs on http://localhost:${port}/`);