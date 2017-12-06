const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('associations', () => {
    const name = 'Joe';

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
        blogPost = new BlogPost({ title : 'JS is Great', content : 'Yep it really is' });
        comment = new Comment({ content : 'Congrats on the great post' });

        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(), blogPost.save(), comment.save()])
            .then(savedRecords => done())
            .catch(done);
    });

    it('saves a relation between a user and a blogPost', done => {
        User.findOne({ name })
            .then(assertNotUndefined)
            .then(user => assertNotUndefined(user.blogPosts))
            .then(assertNotEmpty)
            .then(blogPosts => blogPosts)
            .then(() => done())
            .catch(done);
    });
});