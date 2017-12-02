const assert = require('assert');
const User = require('../src/user');

describe('deleting a user', () => {
    const name = 'Joe';
    let joe = {};

    beforeEach(done => {
        joe = new User({ name });

        joe.save().then(user => done());
    });

    it('model instance remove', done => {
        joe.remove()
            .then(user => User.findOne({ name }))
            .then(user => assert(user === null))
            .then(() => done());
    });

    it('class method remove', done => {
        // Remove a bunch of records with some given criteria
        User.remove({ name })
            .then(user => User.findOne({ name }))
            .then(user => assert(user === null))
            .then(() => done());
    });

    it('class method findOneAndRemove', done => {
        User.findOneAndRemove({ name })
            .then(user => User.findOne({ name }))
            .then(user => assert(user === null))
            .then(() => done());
    });

    it('class method findByIdAndRemove', done => {
        User.findByIdAndRemove(joe._id)
            .then(user => User.findOne({ name }))
            .then(user => assert(user === null))
            .then(() => done());
    });
});