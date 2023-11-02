const path = require('path')
const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const morgan = require('morgan')
const methodOverride = require('method-override')
const session = require('express-session')
const MongoStore = require('connect-mongo');
const connectDB = require('./config/db')

// Load config
dotenv.config({ path: './config/config.env' })

 connectDB()

 
// Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
  }
//mustache engine
  const mustache = require('mustache-express');
  app.engine("mustache", mustache ());
  app.set("view engine", "mustache");
  app.set("views", path.join(__dirname, "views"));

  // Routes
  app.use('/', require('./routes/index'))
  app.use('/auth', require('./routes/auth'))
  app.use('/stories', require('./routes/stories'))
  


const app = express()
const PORT = process.env.PORT || 3000

app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
)