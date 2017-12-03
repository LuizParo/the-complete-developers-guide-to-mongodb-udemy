const assert = require('assert');
const User = require('../src/user');

describe('subdocuments', () => {
    const name = 'Joe';
    const postTitle = 'PostTitle';

    it('can create a subdocument', done => {
        const joe = new User({
            name,
            posts : [{ title : postTitle }]
        });

        joe.save()
            .then(user => User.findOne({ name }))
            .then(user => {
                assert(user !== null);
                assert(user.posts[0] !== undefined);
                assert(user.posts[0].title === postTitle);
            })
            .then(() => done())
            .catch(done);
    });

    it('can add subdocuments to an existing record', done => {
        const joe = new User({ name, posts : [] });

        joe.save()
            .then(user => User.findOne({ name }))
            .then(user => {
                user.posts.push({ title : postTitle });
                return user.save();
            })
            .then(user => User.findOne({ name }))
            .then(user => {
                assert(user.posts[0] !== undefined);
                assert(user.posts[0].title === postTitle);
            })
            .then(() => done())
            .catch(done);
    });

    it('can remove an existing subdocument', done => {
        const joe = new User({
            name,
            posts : [{ title : postTitle }]
        });

        joe.save()
            .then(user => User.findOne({ name }))
            .then(user => {
                user.posts[0].remove()
                return user;
            })
            .then(user => user.save())
            .then(user => User.findOne({ name }))
            .then(user => assert(user.posts[0] === undefined))
            .then(() => done())
            .catch(done);
    });
});