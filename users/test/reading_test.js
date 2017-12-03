const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    const name = 'Joe';
    let joe = {};

    beforeEach(done => {
        joe = new User({ name });

        joe.save()
            .then(data => done())
            .catch(done);
    });

    it('finds all users with a name of joe', done => {
        User.find({ name : 'Joe' })
            .then(users => {
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            })
            .catch(done);
    });

    it('find a user with a particular id', done => {
        User.findOne({ _id : joe._id})
            .then(user => {
                assert(typeof user !== 'undefined');
                assert(user.name === name);
                done();
            })
            .catch(done);
    });
});