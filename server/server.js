const express = require('express');
var fs = require('fs')
var https = require('https')

const app = express();

const productionDomain = 'https://4c3711.xyz';
const testingDomain = 'http://localhost:3000';
const domain = productionDomain;

// Add headers before the routes are defined
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', domain);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
});

require('./routes/system.js')(app);
require('./routes/paladins.js')(app);

app.listen(9000, function () {
    console.log(`[PaladinsAssistant Server] Server is now ready!`)
})