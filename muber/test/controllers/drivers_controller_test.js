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

    it('PUT to /api/drivers/:id edits an existing driver', done => {
        const driver = new Driver({
            email : 't@t.com',
            driving : false
        });

        driver.save()
            .then(driver => driver._id)
            .then(driverId => {
                request(app)
                    .put(`/api/drivers/${driverId}`)
                    .send({ driving : true })
                    .end((err, resp) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        Driver.findById(driverId)
                            .then(driver => assert(driver.driving === true))
                            .then(() => done())
                            .catch(done);
                    });
            })
            .catch(done);
    });

    it('DELETE to /api/drivers/:id can delete a driver', done => {
        const driver = new Driver({
            email : 'test@test.com',
            driving : false
        });
        
        driver.save()
            .then(driver => driver._id)
            .then(driverId => {
                request(app)
                    .delete(`/api/drivers/${driverId}`)
                    .end((err, resp) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        Driver.findById(driverId)
                            .then(driver => assert(driver === null))
                            .then(() => done())
                            .catch(done);
                    })
            })
            .catch(done);
    });
});