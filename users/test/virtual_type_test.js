const assert = require('assert');
const User = require('../src/user');

describe('virtual types', () => {
    const name = 'Joe';
    const postTitle = 'PostTitle';

    it('postCount returns number of posts', done => {
        const joe = new User({
            name,
            posts : [{ title : postTitle }]
        });

        joe.save()
            .then(user => User.findOne({ name }))
            .then(user => assert(joe.postCount === 1))
            .then(() => done())
            .catch(done);
    });
});