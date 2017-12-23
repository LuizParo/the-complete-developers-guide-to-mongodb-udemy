const Driver = require('../models/driver');

module.exports = {
    greeting(req, res) {
        res.send({ hi : 'there' });
    },

    index(req, res, next) {
        const { lng, lat } = req.query;

        Driver.geoNear(
            { type : 'Point', coordinates : [parseFloat(lng), parseFloat(lat)] },
            { spherical : true, maxDistance : 200000 }
        )
        .then(drivers => res.send(drivers))
        .catch(next);
    },

    create(req, res, next) {
        Driver.create(req.body)
            .then(driver => res.status(201).send(driver))
            .catch(next);
    },

    edit(req, res, next) {
        const driverId = req.params.id;
        
        Driver.findByIdAndUpdate(driverId, req.body)
            .then(() => Driver.findById(driverId))
            .then(driver => {
                if (driver === null) {
                    res.status(404).send();
                    return;
                }

                res.status(204).send();
            })
            .catch(next);
    },

    delete(req, res, next) {
        const driverId = req.params.id;

        Driver.findByIdAndRemove(driverId)
            .then(driver => {
                if (driver === null) {
                    res.status(404).send();
                    return;
                }
                res.status(204).send();
            })
            .catch(next);
    }
};