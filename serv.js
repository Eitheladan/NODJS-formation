var express = require('express');
var app = express();

app.get('/', function (req, res) {
    res.send('Welcome to Node AFPA')
})

app.listen(8000)