const express = require('express');
const cors = require('cors');
const app = express();
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const conn = require('./src/db/conn');
require('dotenv').config()


//port initialize
const port = process.env.PORT || 3000;


app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(cookieParser());


//router
const itemRoutes = require('./src/routes/item.routes')
app.use('/items', itemRoutes)



//server connected
module.exports = app.listen(port, () => {
    console.log(`Server is connected ${port}....`)
});
