const assert = require('assert');
const User = require('../src/user');

describe('updating users', () => {
    const name = 'Joe';
    let joe = {};

    beforeEach(done => {
        joe = new User({
            name,
            postCount : 0
        });
        joe.save()
            .then(user => done())
            .catch(done);
    });

    function assertName(operation, newName) {
        return operation
            .then(user => User.findOne({ name : newName }))
            .then(user => {
                assert(user !== null);
                return user;
            })
            .then(user => assert(newName === user.name))
    }

    it('instance type using set and save', done => {
        const newName = 'Alex';
        joe.set('name', newName);

        assertName(joe.save(), newName)
            .then(() => done())
            .catch(done);
    });

    it('a model instance can update', done => {
        const newName = 'Alex';

        assertName(joe.update({ name : newName }), newName)
            .then(() => done())
            .catch(done);
    });

    it('a model class can update', done => {
        const newName = 'Alex';

        assertName(
            User.update({ name : joe.name }, { name : newName }),
            newName
        )
        .then(() => done())
        .catch(done);
    });

    it('a model class can update one record', done => {
        const newName = 'Alex';

        assertName(
            User.findOneAndUpdate({ name : joe.name }, { name : newName }),
            newName
        )
        .then(() => done())
        .catch(done);
    });

    it('a model class can find a record with an id and update', done => {
        const newName = 'Alex';
        
        assertName(
            User.findByIdAndUpdate(joe._id, { name : newName }),
            newName
        )
        .then(() => done())
        .catch(done);
    });

    xit('a user can have their postCount incremented by 1', done => {
        User.update({ 
            name 
        }, { 
            $inc : {
                postCount: 1 
            } 
        })
        .then(user => User.findOne({ name }))
        .then(user => assert(user.postCount === 1))
        .then(() => done())
        .catch(done);
    });
});