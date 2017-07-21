var Visit, mongoose = require('./visit.model.js');

// Display list of all Visits
exports.get = function (req, res) {
    Visit.find()
        .populate('process')
        .populate('shop')
        .then(visits => res.send(visits))
        .catch(error => res.send(error));
};
// Display list of all Visits for a specific process
exports.getByProcess = function (req, res) {
    let process = req.params.process;
    Visit.find({ process: process })
        .populate('process')
        .populate('shop')
        .then(visits => res.send(visits))
        .catch(error => res.send(error));
};
// Display one Visit by id
exports.getOneById = function (req, res) {
    let id = req.params.id;
    Visit.find({ _id: id })
        .populate('process')
        .populate('shop')
        .then(visit => res.send(visit))
        .catch(error => res.send(error));
};
// Creates one Visit
exports.add = function (req, res) {
    const newVisit = new Visit({
        status: req.body.status,
        shop: mongoose.Types.ObjectId(req.body.shop),
        process: mongoose.Types.ObjectId(req.body.process)
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
                shop: mongoose.Types.ObjectId(req.body.shop),
                process: mongoose.Types.ObjectId(req.body.process)
            }
        },
        { upsert: true })
        .populate('process')
        .populate('shop')
        .then(visit => res.send(visit))
        .catch(error => res.send(error));
};
// Removes one Visit
exports.delete = function (req, res) {
    let id = req.params.id;
    Visit.remove({ _id: id })
        .populate('process')
        .populate('shop')
        .then(visit => res.send(visit))
        .catch(error => res.send(error));
};