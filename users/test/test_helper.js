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
    // console.log('global beforeEach');
    const { users, comments, blogposts } = mongoose.connection.collections;

    users.drop(() => {
        comments.drop(() => {
            blogposts.drop(() => done());
        });
    });
});