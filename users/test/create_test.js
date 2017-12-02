const assert = require('assert');
const User = require('../src/user');

describe('Creating records', () => {
    //beforeEach(() => console.log('local beforeEach'));

    it('saves a user', done => {
        const joe = new User({
            name : 'Joe'
        });

        assert(joe.isNew);

        joe.save()
            .then(() => {
                assert(!joe.isNew);
                done();
            })
            .catch(done);
    });
});