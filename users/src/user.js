const mongoose = require('mongoose');
const postSchema = require('./post');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type : String,
        validate : {
            validator : name => name.length > 2,
            message : 'Name must be longer than 2 characters.'
        },
        required : [true, 'Name is required.']
    },
    postCount : Number,
    posts : [postSchema]
});

const User = mongoose.model('user', userSchema);

module.exports = User;