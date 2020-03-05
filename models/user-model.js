const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const taskSchema = new Schema({
//     name: String,
//     description: String,
//     time: Number
// });

const userSchema = new Schema({
    name: String,
    googleId: String,
    email: String,
    // tasks: [taskSchema]
});
const User = mongoose.model('user', userSchema);

module.exports = User;
