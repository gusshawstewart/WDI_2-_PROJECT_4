var LocalStrategy = require("passport-local").Strategy;
var User          = require("../models/user");

module.exports = function(passport){

    passport.use("local-signup", new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
      }, function(req, email, password, done){

// Logic to register a user will go in here. all the above is doing is searching for an email and a password from req.body.
      
console.log("HERE");
        // check if there is a user with that email.
        User
        .findOne({email: email})
        .then(function(user){
console.log(user);
          if (user) return done(null, false, {message: "please choose another email"});

console.log("ERE")
          // make a new instance of the user object with the correct fields.

          var newUser                     = new User();
          newUser.firstName               = req.body.firstName;
          newUser.lastName                = req.body.lastName;
          newUser.email                   = email;
          newUser.password                = password;
          newUser.passwordConfirmation    = req.body.passwordConfirmation;

console.log(newUser);

          newUser
          .save()
          .then(function(user){
            return done(null, user);
          })
          .catch(function(err){
            return done(err, false, {message: "something went wrong"});
          });
        })
          .catch(function(err){
            console.log(err);
            return done(err, false, {message: "something went wrong"});
          });
        }));

  };




      