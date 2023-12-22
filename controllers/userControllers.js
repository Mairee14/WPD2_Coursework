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

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
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
      role: 'alumni' // Assuming default role is alumni for signup
    });

    const savedUser = await newUser.save();

    // Redirect to the login page upon successful signup
    // return res.redirect('/form/login'); // Replace '/login' with your actual login route

    // Send a success message to the client instead of redirecting
    return res.status(200).send('Signup successful. Please login!');


  } catch (error) {
    console.error('Error creating user:', error);
    return res.status(500).send('Error creating user');
  }
};


// code for getting the user




const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      // If authentication fails, redirect to login page or handle it as needed
      console.log(info.message); // Log the error message
      return res.redirect('/form/login'); // Adjust the redirect URL to your login page
    }
    req.logIn(user, (err) => {
       console.log({loginuser: user});
      if (err) {
        return next(err);
      }
      // Upon successful login, redirect to the dashboard or specific user area
      if (user.role === 'alumni') {
        return res.redirect('/alumni-events');
      } 
      else if (user.role === 'admin') {
        // const users = getAllUsers();
        // console.log('users', users);
        // return res.render("admin", { userData: users });
        return res.redirect('/admin');
        
      }
      return res.redirect('/alumni-events'); // Adjust the default dashboard route as needed
    });
  })(req, res, next);
};





const logout = (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
};

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/form/login');
};

const ensureAlumni = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'alumni') {
    return next();
  }
  res.redirect('form/login');
};

const ensureManager = (req, res, next) => {
  if (req.isAuthenticated() && req.user.role === 'admin') {
    return next();
  }
  res.redirect('/form/login');
};



const editUser = async (req, res) => {
  const { id } = req.params;
  // Code to edit the user
  console.log('Edit user with id:', id);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  // Code to delete the user
  console.log('Delete user with id:', id);
};

module.exports = {
  createUser,
  login,
  logout,
   ensureAuthenticated,
  ensureAlumni,
  ensureManager,
  editUser,
  deleteUser
};
