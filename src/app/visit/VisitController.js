var Visit = require('./visit.model.js');

// Display list of all Visits
exports.get = function (req, res) {
    Visit.find()
        .then(visits => res.send(visits))
        .catch(error => res.send(error));
};
// Display list of all Visits for a specific process
exports.getByProcess = function (req, res) {
    let process = req.params.process;
    Visit.find({ process: process })
        .then(visits => res.send(visits))
        .catch(error => res.send(error));
};
// Display one Visit by id
exports.getOneById = function (req, res) {
    let id = req.params.id;
    Visit.find({ _id: id })
        .then(visit => res.send(visit))
        .catch(error => res.send(error));
};
// Creates one Visit
exports.add = function (req, res) {
    const newVisit = new Visit({
        status: req.body.status,
        shop: req.body.shop,
        process: req.body.process
    });
    newVisit.save()
        .then(visit => res.send(visit))
        .catch(error => res.send(error));
};
// Updates one Visit
exports.edit = function (req, res) {
    let id = req.params.id;
    Visit.update({ _id: id },
        {
            $set: {
                status: req.body.status,
                shop: req.body.shop,
                process: req.body.process
            }
        },
        { upsert: true })
        .then(visit => res.send(visit))
        .catch(error => res.send(error));
};
// Removes one Visit
exports.delete = function (req, res) {
    let id = req.params.id;
    Visit.remove({ _id: id })
        .then(visit => res.send(visit))
        .catch(error => res.send(error));
};