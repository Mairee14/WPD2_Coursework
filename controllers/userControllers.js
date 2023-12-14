const User = require("../models/userModels");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const saltRounds = 10;

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });

      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

const createUser = async (req, res) => {
  const { name, email, password, confirmPassword, yearGroup, location, role } = req.body;

  if (password !== confirmPassword) {
    return res.status(400).send('Passwords do not match');
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send('User with this email already exists');
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      yearGroup,
      location,
      role
    });

    const savedUser = await newUser.save();

    req.login(savedUser, (err) => {
      if (err) {
        console.error('Error logging in user:', err);
        return res.status(500).send('Error logging in user');
      }

      if (savedUser.role === 'alumni') {
        return res.redirect('/alumni/dashboard');
      } else if (savedUser.role === 'manager') {
        return res.redirect('/manager/dashboard');
      }
      return res.redirect('/dashboard');
    });
  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).send('Error creating user');
  }
};


const getAllUsers = (req, res) => {
    User.find({})
        .then((users) => {
            console.log(users);
            res.render("dashboard", { alumniData: users });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Error getting data; please try again");
        });
};

const login = (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: true // If using flash messages
  })(req, res, next);
};

const logout = (req, res) => {
  req.logout();
  res.redirect('/');
};

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

const ensureAlumni = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'alumni') {
    return next();
  }
  res.redirect('/login');
};

const ensureManager = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'manager') {
    return next();
  }
  res.redirect('/login');
};

module.exports = {
  createUser,
  login,
  logout,
  getAllUsers,
  ensureAuthenticated,
  ensureAlumni,
  ensureManager,
};
