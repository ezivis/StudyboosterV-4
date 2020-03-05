const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
//const FacebookStrategy =  require('passport-facebook');
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user,done) => {
    done(null,user.id);
});

passport.deserializeUser((id,done) => {
    User.findById(id).then((user) => {
        done(null,user);
    })
});


passport.use(new GoogleStrategy({
    // options for google strat
    callbackURL:'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, (accessToken, refreshToken, profile, done) => {
    // passport callback function
    console.log(profile);
    //check if user exists already
    User.findOne({googleId:profile.id}).then((currentUser) => {
        console.log("able to connect to db");
        if(currentUser){
            // already have the user
            console.log('user is ' + currentUser);
            done(null, currentUser);
        }else{
            // otherwise create new user
            new User({ // async
                name: profile.displayName,
                googleId: profile.id,
                email:profile['emails'][0].value,
                tasks:[undefined]
            }).save().then((newUser) => {
                console.log('new user created: '+ newUser);
                done(null, newUser);
            });
        }
    });



    })
);
