const assert = require('assert');
const User = require('../src/user');

describe('Reading users out of the database', () => {
    const alexName = 'Alex';
    const joeName = 'Joe';
    const mariaName = 'Maria';
    const zachName = 'Zach';

    let alex = {};
    let joe = {};
    let maria = {};
    let zach = {};

    beforeEach(done => {
        alex = new User({ name : alexName });
        joe = new User({ name : joeName });
        maria = new User({ name : mariaName });
        zach = new User({ name : zachName });

        Promise.all([alex.save(), joe.save(), maria.save(), zach.save()])
            .then(data => done())
            .catch(done);
    });

    it('finds all users with a joeName of joe', done => {
        User.find({ name : 'Joe' })
            .then(users => {
                assert(users[0]._id.toString() === joe._id.toString());
                done();
            })
            .catch(done);
    });

    it('find a user with a particular id', done => {
        User.findOne({ _id : joe._id })
            .then(user => {
                assert(typeof user !== 'undefined');
                assert(user.name === joeName);
                done();
            })
            .catch(done);
    });

    it('can skip and limit the result set', done => {
        User.find({})
            .sort({ name : 1 }) // 1 -> Ascending. -1 -> Descending
            .skip(1)
            .limit(2)
            .then(users => {
                assert(users.length === 2);
                assert(joeName === users[0].name);
                assert(mariaName === users[1].name);
            })
            .then(() => done())
            .catch(done);
    });
});