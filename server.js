const express = require('express') 
const port = process.env.PORT || 8080;
const app = express()

app.use(express.static(_+_dirname + "/dist"));
app.get(/.*/, function(req, res) {
    res.sendfile(__dirname + "/dist/index.html")
}); 
app.listen(port);

console.log('Server started...')