const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const connectDB =require('./config/db');
const errorHandler = require('./middleware/error');

// Route files
const bootcamps = require('./routes/bootcamps');

// Load enviroment

dotenv.config({path: './config/config.env'});

// Connection to database

connectDB();

// Server setup

const app = express();

// *****************************************

// Body parser

app.use(express.json());

// Dev logging through 'Morgan'

if(process.env.NODE_ENV == 'development'){
  app.use(morgan('dev'));
}

const PORT = process.env.PORT || 5000;

// Address routes requests:

app.use('/api/v1/bootcamps', bootcamps);

// Error handler

app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));

// MAIN

process.on('unhandledRejection', function(error, promise){
  console.error(`You got this Error: ${error.message}\n -- For the promise below:\n`);
  promise.catch(function(error){
    console.error(error);
  });
  server.close(function(){
    process.exit(1);
  });
});
