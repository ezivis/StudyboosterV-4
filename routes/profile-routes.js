const router = require('express').Router();
var data = require('../data.json');
const authCheck = (req, res, next) =>{
    if(!req.user){
        res.redirect('/auth/login');
    }
    else{
        next();
    }
};

router.get('/', authCheck, (req, res) => {
    data['user'] = req.user;
    res.render('index', data);
})

module.exports = router;
