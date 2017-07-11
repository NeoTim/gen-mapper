const express = require('express')
const bodyParser = require('body-parser')

const app = express();

const router = require('./database/router.js');

// create application/json parser
const jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static('./scripts'));

app.use(urlencodedParser);
app.use('/users', router);

app.listen(8000, function() {
    console.log('app listening on localhost:8000')
})