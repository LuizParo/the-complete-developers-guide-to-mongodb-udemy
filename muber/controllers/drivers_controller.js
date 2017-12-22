const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({ hi : 'there' });
    },

    create(req, res) {
        Driver.create(req.body)
            .then(driver => res.status(201).send(driver))
            .catch(err => res.status(400).send({error : err}));
    }
};