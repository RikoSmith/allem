const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('../config/keys');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.JWT_KEY;

module.exports = passport => {
  passport.use(
    new JWTStrategy(options, (payload, done) => {
      User.findById(payload._id)
        .then(user => {
          if (user) {
            user.password = 'swordfish';
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};
