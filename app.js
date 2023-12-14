const express = require('express');
const path = require('path');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/mongoDB');
const dotenv = require('dotenv');
const flash = require('connect-flash');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Connect to the database
connectDB();

// Mustache engine
const mustache = require('mustache-express');
const app = express();

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
const public = path.join(__dirname, 'public');
app.use(express.static(public));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const crypto = require('crypto');

// Function to generate a secure session key
const generateSessionKey = () => {
  return crypto.randomBytes(64).toString('hex');
};

// Example usage
const sessionKey = generateSessionKey();
console.log('Generated Session Key:', sessionKey);




// Sessions middleware with a generated secure key
app.use(
  session({
    secret: generateSessionKey(), // Using the generated session key
    resave: false,
    saveUninitialized: false,
  })
);

// Passport middleware initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Import and use your user model
const User = require('./models/userModels');


// Your routes
const userRoutes = require('./routes/backendroutes/userRoutes');
const eventRoutes = require('./routes/backendroutes/eventRoutes');
const formRoutes = require('./routes/formRoutes');
const eventformroutes = require('./routes/eventformroutes');

// Use routes
app.use('/form', formRoutes);
app.use('/manager', userRoutes);
app.use('/alumni-events', eventRoutes);
app.use('/event', eventformroutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
