const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const app = express();

// init middleware
app.use(morgan('dev'));
app.use(helmet()); // Bảo vệ các thông tin header quan trọng
app.use(compression()) // Giảm kích thước dữ liệu truyền tải

// init database
require('./dbs/init.mongodb');
const { countConnect, checkOverLoad } = require('./helpers/check.connect');
countConnect();
// checkOverLoad()

// init routes
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello, world!'
    })
})

// handle errors

module.exports = app;