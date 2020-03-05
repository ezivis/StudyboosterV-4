const router = require('express').Router();
const passport = require('passport');
// auth login
router.get('/login', (req, res) => {
    res.render('login');
});

// auth logout
router.get('/logout', (req, res)=> {
    //handle with passport
    res.send('logging out');
});
// auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
})); // Specifies we want userr profile data

// callback route for google to rredirect to
router.get('/google/redirect', passport.authenticate('google'), (req,res) => {
    // passport's callback function is fired before this
    res.redirect('/profile/');
});

module.exports = router;
