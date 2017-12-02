const assert = require('assert');
const User = require('../src/user');

describe('validating records', () => {
    it('requires a username', done => {
        const user = new User({ name : undefined });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name is required.')
        
        done();
    });

    it('requies a username longer than 2 characters', done => {
        const user = new User({ name : 'Al' });
        const validationResult = user.validateSync();
        const { message } = validationResult.errors.name;
        assert(message === 'Name must be longer than 2 characters.');

        done();
    });
    
    it('disallows invalid records from being saved', done => {
        const user = new User({ name : 'Al' });
        user.save()
            .catch(validationResult => validationResult.errors.name.message)
            .then(message => assert(message === 'Name must be longer than 2 characters.'))
            .then(() => done());
    });
});