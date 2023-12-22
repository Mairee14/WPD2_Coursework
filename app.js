const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const connectDB = require('./config/mongoDB');
const dotenv = require('dotenv');
const flash = require('connect-flash');

// Load environment variables
dotenv.config({ path: './config/config.env' });

// Initialize Passport configuration
const authInitialize = require('./config/passport');

// Connect to the database
connectDB();

// Mustache engine setup
const mustache = require('mustache-express');
const app = express();

app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
const public = path.join(__dirname, 'public');
app.use(express.static(public));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Sessions middleware with a generated secure key
const crypto = require('crypto');
const generateSessionKey = () => crypto.randomBytes(64).toString('hex');

app.use(
  session({
    secret: generateSessionKey(),
    resave: true,
    saveUninitialized: false,
    cookie: {maxAge: 1000 * 60 * 60 * 8}
  })
);

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
const indexRoutes = require('./routes/indexRoutes');
const formRoutes = require('./routes/formRoutes');
const eventRoutes = require('./routes/backendroutes/eventRoutes');
const userRoutes = require('./routes/backendroutes/userRoutes');
const eventPageRoutes = require('./routes/eventPageRoutes');
const aboutRoutes = require('./routes/aboutRoutes');
const contactRoutes = require('./routes/contactRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const managerdashboardRoutes = require('./routes/managerdashboardRoutes');
const authRoutes = require('./routes/auth');


// Use routes
app.use('/', indexRoutes);
app.use('/form', formRoutes);
app.use('/alumni-events', eventRoutes);
app.use('/eventPage', eventPageRoutes);
app.use('/about', aboutRoutes);
app.use('/contact', contactRoutes);
app.use('/dashboard', dashboardRoutes);
app.use('/admin', managerdashboardRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);

// Passport initialization (if not already initialized)
app.use(passport.initialize());

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
