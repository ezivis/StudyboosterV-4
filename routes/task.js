var data = require('../data.json');
exports.viewTask = function(req, res){
    res.render('task_page', {});
};

exports.addTask = function(req, res){
    res.render('add_task', {});
};
