const User = require("../models/userModels");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const saltRounds = 10;

function authInitialize(passport, getUserByEmail, getUserById) {
    const authenticateUser = async (email, password, done) => {
        async (email, password, done) => {
        const user = getUserByEmail({ email });

                if (user==null) {
                    return done(null, false, { message: 'Incorrect email.' });
                }



                try {
                    if (await bcrypt.compare(password, user.password)) {
                        return done(null, user)
                    } else {
                        return done(null, false, { message: 'Incorrect password.' });
                    }
                } catch (error) {
                    return done(error);

                }
          }
        }
  
    // Inside passport-config.js or similar
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

      

    passport.use(
        new LocalStrategy(
          { usernameField: 'email' },
          (email, password, done) => {
            // Authentication logic here
          },
        {passReqToCallback : true}
        )
      );



    }

    module.exports = {
        authInitialize,     
     
        // ensureAuthenticated,
        // ensureAlumni,
        // ensureManager,
    };
