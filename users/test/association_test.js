const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');
const Comment = require('../src/comment');

describe('associations', () => {
    const name = 'Joe';
    const blogPostTitle = 'JS is Great';
    const commentContent = 'Congrats on the great post';

    let joe = {};
    let blogPost = {};
    let comment = {};

    function assertNotUndefined(obj) {
        assert(typeof obj !== 'undefined');
        return obj;
    }

    function assertNotEmpty(array) {
        assert(array.length > 0);
        return array;
    }

    beforeEach(done => {
        joe = new User({ name });
        blogPost = new BlogPost({ title : blogPostTitle, content : 'Yep it really is' });
        comment = new Comment({ content : commentContent });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(savedRecords => done())
            .catch(done);
    });

    it('saves a relation between a user and a blogPost', done => {
        User.findOne({ name })
            .populate('blogPosts')
            .then(assertNotUndefined)
            .then(user => assertNotUndefined(user.blogPosts))
            .then(assertNotEmpty)
            .then(blogPosts => assert(blogPosts[0].title === blogPostTitle))
            .then(() => done())
            .catch(done);
    });

    it('saves a full relation graph', done => {
        User.findOne({ name })
            .populate({
                path : 'blogPosts',
                populate : {
                    path : 'comments',
                    model : 'comment',
                    populate : {
                        path : 'user',
                        model : 'user'
                    }
                }
            })
            .then(assertNotUndefined)
            .then(user => assertNotUndefined(user.blogPosts))
            .then(assertNotEmpty)
            .then(blogPosts =>  assertNotUndefined(blogPosts[0].comments))
            .then(assertNotEmpty)
            .then(comments => assert(comments[0].content === commentContent))
            .then(() => done())
            .catch(done);
    });
});