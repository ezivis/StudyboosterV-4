
/*
 * GET home page.
 */

exports.view = function(req, res){
    res.render('friends', {});
};
exports.open = function(req, res){
    res.render('friend_page', {});
};
