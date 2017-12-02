const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

before(done => {
    mongoose.connect('mongodb://localhost/users_test', { useMongoClient : true })
        .catch(done);
    
    mongoose.connection
        .once('open', done)
        .on('error', done);
});

beforeEach(done => {
    mongoose.connection.collections.users.drop(() => {
        // console.log('global beforeEach');
        done();
    });
});