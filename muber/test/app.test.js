const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('the express app', () => {

    it('handles a GET request to /api', done => {
        request(app)
            .get('/api')
            .end((err, resp) => {
                if (err) {
                    done(err);
                    return;
                }

                assert(resp.body.hi === 'there');
                done();
            });
    });
});