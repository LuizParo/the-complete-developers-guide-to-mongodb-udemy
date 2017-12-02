const assert = require('assert');
const User = require('../src/user');

describe('updating users', () => {
    const name = 'Joe';
    let joe = {};

    beforeEach(done => {
        joe = new User({ name });
        joe.save().then(user => done());
    });

    it('instance type using set and save', done => {
        const newName = 'Alex';

        joe.set('name', newName);
        joe.save()
            .then(user => User.findOne({ name : newName }))
            .then(user => assert(newName === user.name))
            .then(() => done());
    });
});