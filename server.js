const express = require('express')
const http = require('http')
const enforce = require('express-sslify');

const app = express()

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/dist"));
app.use(enforce.HTTPS({ trustProtoHeader: true }))

app.get(/.*/, function(req, res) {
    res.sendfile(__dirname + "/dist/index.html")
}); 

http.createServer(app).listen(port)

