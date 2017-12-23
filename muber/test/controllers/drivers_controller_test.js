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

    it('GET to /api/drivers finds drivers in a location', done => {
        const seattleDriver = new Driver({
            email : 'test@test.com',
            geometry : { type : 'Point', coordinates : [-122.4759902, 47.6147628] }
        });

        const miamiDriver = new Driver({
            email : 'miami@test.com',
            geometry : { type : 'Point', coordinates : [-80.253, 25.791] }
        });

        Promise.all([ seattleDriver.save(), miamiDriver.save() ])
            .then(drivers => {
                request(app)
                    .get(`/api/drivers?lng=-80&lat=25`)
                    .end((err, resp) => {
                        if (err) {
                            done(err);
                            return;
                        }

                        assert(resp.body.length === 1);
                        assert(resp.body[0].obj.email === 'miami@test.com');
                        done();
                    })
            })
            .catch(done);
    });
});