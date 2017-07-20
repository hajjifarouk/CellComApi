const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const logger = require('morgan');
const router = express.Router();
const port = process.env.PORT || 3000;
const db = require('./src/mongoose.db.js');

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use(bodyParser.json());
//app.use(logger('dev'));
require('./src/routes')(router);
app.use('/', router);

var server = app.listen(port);
require('./src/config/socket.io')(app, server);

console.log(`App Runs on http://localhost:${port}/`);