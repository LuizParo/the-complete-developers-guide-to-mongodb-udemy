const mongoose = require('mongoose');
const postSchema = require('./post');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name : {
        type : String,
        validate : {
            validator : name => name.length > 2,
            message : 'Name must be longer than 2 characters.'
        },
        required : [true, 'Name is required.']
    },
    posts : [postSchema],
    likes : Number,
    blogPosts : [{
        type : Schema.Types.ObjectId,
        ref : 'blogPost'
    }]
});

UserSchema.pre('remove', function(next) {
    const BlogPost = mongoose.model('blogPost');
    BlogPost.remove({
        _id : {
            $in : this.blogPosts
        }
    })
    .then(blogPosts => next());
});

UserSchema
    .virtual('postCount')
    .get(function() {
        return this.posts.length || 0;
    });

const User = mongoose.model('user', UserSchema);

module.exports = User;