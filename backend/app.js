const express = require('express');
const path = require('path');
const logger = require('morgan');
const makeConnection = require('./connection');
const postRouter = require('./routes/post.router');
const cors = require('cors');
require('dotenv').config();

const app = express();

// middleware setup
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors())

// database connection
makeConnection();

// routes setup
app.use('/api', postRouter);

// server listening
app.listen(process.env.PORT, () => {
    console.log(`server is up and listening at port ${process.env.PORT}`);
});