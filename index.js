console.log('Starting....')
var express = require('express')
var cors = require('cors')
var morgan = require('morgan');
var secure = require('ssl-express-www')

const PORT = process.env.PORT || 8080

var mainrouter = require('./main')
var app = express()
app.enable('trust proxy');
app.use(morgan('dev'));
app.set("json spaces",2)
app.use(cors())
// app.use(secure)
app.use(express.static("public"))

app.use('/', mainrouter)

app.get('/', (req, res) => 
res.sendFile('./public/index.html')
)
app.listen(PORT, () => {
    console.log('Connected...')
    console.log("Server running on http://localhost:" + PORT)
})

module.exports = app
