const mongoose = require('mongoose');
const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('middleware', () => {
    const name = 'Joe';
    const blogPostTitle = 'JS is Great';

    let joe = {};
    let blogPost = {};

    beforeEach(done => {
        joe = new User({ name });
        blogPost = new BlogPost({ title : blogPostTitle, content : 'Yep it really is' });

        joe.blogPosts.push(blogPost);

        Promise.all([joe.save(), blogPost.save()])
            .then(savedRecords => done())
            .catch(done);
    });

    it('users clean up dangling blogposts on remove', done => {
        joe.remove()
            .then(user => BlogPost.count())
            .then(count => assert(count === 0))
            .then(() => done())
            .catch(done);
    });
});