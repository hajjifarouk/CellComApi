var Visit = require('./Visit.model.js');

// Display list of all Visits
exports.getVisits = function (req, res) {
    Shop.find()
        .then(shops => res.send(shops))
        .catch(error => res.send(error));
};
// Display list of all Visits for a specific process
exports.getVisitsByProcess = function (req, res) {
    let process = req.params.process;
    Visit.find({ process: process })
        .then(visits => res.send(visits))
        .catch(error => res.send(error));
};
// Display one Visit by id
exports.getOneVisitById = function (req, res) {
    let id = req.params.id;
    Visit.find({ id: id })
        .then(visit => res.send(visit))
        .catch(error => res.send(error));
};
// Creates one Visit
exports.addVisit = function (req, res) {
    const newVisit = new Visit({
        status: req.params.status,
        shop: req.params.shop,
        process: req.params.process
    });
    newVisit.save()
        .then(visit => res.send(visit))
        .catch(error => res.send(error));
};
// Updates one Visit
exports.editVisit = function (req, res) {
    let id = req.params.id;
    Visit.update({ id: id },
        {
            $set: {
                status: req.params.status,
                shop: req.params.shop,
                process: req.params.process
            }
        },
        { upsert: true })
        .then(visit => res.send(visit))
        .catch(error => res.send(error));
};
// Removes one Visit
exports.deleteVisit = function (req, res) {
    let id = req.params.id;
    Visit.remove({ id: id })
        .then(visit => res.send(visit))
        .catch(error => res.send(error));
};