const express = require('express')
const http = require('http')
const enforce = require('express-sslify');

const app = express()

const port = 3000;

app.use(enforce.HTTPS({ trustProtoHeader: true }))
app.use(express.static(__dirname + "/dist"));

app.get(/.*/, function(req, res) {
    res.sendFile(__dirname + "/dist/index.html")
}); 

http.createServer(app).listen(port)

