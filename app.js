const express = require('express');
const path = require("path");
const app = express();
const dotenv = require('dotenv');
const connectDB = require('./config/mongoDB');


//load config
dotenv.config({ path: './config/config.env' });

//connect to database
connectDB();

//mustache engine
const mustache = require("mustache-express");
app.engine("mustache", mustache());
app.set("view engine", "mustache");
app.set('views', path.join(__dirname, 'views'));


  // Routes
//   app.use('/', require('./routes/index'))
//   app.use('/auth', require('./routes/auth'))
//   app.use('/stories', require('./routes/stories'))

//middlewares
const public = path.join(__dirname, "public");
app.use(express.static(public));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//user routes
const userRoutes = require("./routes/backendroutes/userRoutes");
const eventRoutes = require("./routes/backendroutes/eventRoutes");

//Require routes
const formRoutes = require("./routes/formRoutes");
const eventformroutes =require("./routes/eventformroutes");



//views routing
app.use("/form", formRoutes);//routes for both login and signup
app.use("/manager", userRoutes); //routing for the user data from the signup
app.use("/alumni-events", eventRoutes);
app.use("/event", eventformroutes );




  

//Routes
const PORT = process.env.PORT || 3000;

app.listen(PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);


