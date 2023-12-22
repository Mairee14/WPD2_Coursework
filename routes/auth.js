const express = require('express')
const router = express.Router()
const path = require("path");
const passport = require('passport');
const { createUser, getAllUsers, login } = require("../controllers/userControllers");

router.get("/", (_req, res) => {
  res.sendFile(path.join(__dirname, "../public", "pages", "login.html"));
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { 
      return next(err); 
    }
    if (!user) { 
      console.log(info.message); // Log the error message for further insight
      return res.redirect('/form/login');
    }
    req.logIn(user, (err) => {
      if (err) { 
        return next(err); 
      }
      // Redirect based on user role upon successful login
      if (user.role === 'alumni') {
        return res.redirect('/alumni-events');
      } else if (user.role === 'admin') {
        return res.redirect('/admin');
      }
      return res.redirect('/alumni-events');
    });
  })(req, res, next);
});

router.post('/user', async (req, res) => {
    try {
      // Call the createUser function passing req and res objects
      await createUser(req, res);
      // If createUser executes successfully, it handles the response itself
      // and sends the appropriate status or redirects as configured in the function
    } catch (error) {
      console.error('Error in creating user:', error);
      res.status(500).send('Error creating user'); // Send a generic error message for any failures
    }
  });
  

  // Define a route for handling user login
router.post('/login', (req, res, next) => {
  login(req, res, ); // Call the login function passing req, res, and next
});

// Inside auth.js or similar


router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/login',
  failureFlash: true
}));


module.exports = router;