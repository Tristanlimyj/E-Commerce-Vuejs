const express = require('express') 
const secure = require('ssl-express-www')

const app = express()
app.use(secure)

const port = process.env.PORT || 8080;

app.use(express.static(__dirname + "/dist"));
app.get(/.*/, function(req, res) {
    res.sendfile(__dirname + "/dist/index.html")
}); 
app.listen(port);
