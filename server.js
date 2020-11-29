const express = require('express') 
const app = express()
const enforce = require('express-sslify');

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/dist"));
app.use(enforce.HTTPS({ trustProtoHeader: true }))

app.get(/.*/, function(req, res) {
    res.sendfile(__dirname + "/dist/index.html")
}); 
app.listen(port);
