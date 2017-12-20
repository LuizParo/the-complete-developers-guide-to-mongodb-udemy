const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');

const Driver = mongoose.model('driver');

describe('drivers controller', () => {

    it('POST to /api/drivers creates a new driver', done => {
        Driver.count()
            .then(count => {
                request(app)
                    .post('/api/drivers')
                    .send({ email : 'test@test.com'})
                    .end((err, resp) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        Driver.count()
                            .then(newCount => assert(newCount === count + 1))
                            .then(() => done())
                            .catch(done);
                    });
            })
            .catch(done);
    });
});