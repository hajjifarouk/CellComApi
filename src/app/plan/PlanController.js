var Plan, mongoose = require('./plan.model.js');

// Display list of all plans
exports.get = function (req, res) {
    Plan.find()
        .populate('user')
        .populate('visits')
        .then(plans => res.send(plans))
        .catch(error => res.send(error));
};
// Display list of all plans for a specific process
exports.getByProcess = function (req, res) {
    let process = req.params.process;
    Plan.find({ process: process })
        .populate('user')
        .populate('visits')
        .then(plans => res.send(plans))
        .catch(error => res.send(error));
};
// Display one plan by id
exports.getOneById = function (req, res) {
    let id = req.params.id;
    Plan.find({ _id: id })
        .populate('user')
        .populate('visits')
        .then(plan => res.send(plan))
        .catch(error => res.send(error));
};
// Creates one plan
exports.add = function (req, res) {
    const newPlan = new Plan({
        date: req.body.date,
        user: mongoose.Types.ObjectId(req.body.user),
        visits: req.body.visits.map(function (visit) { return mongoose.Types.ObjectId(visit); })
    });
    newPlan.save()
        .then(plan => res.send(plan))
        .catch(error => res.send(error));
};
// Updates one plan
exports.edit = function (req, res) {
    let id = req.params.id;
    Plan.update({ _id: id },
        {
            $set: {
                date: req.body.date,
                user: mongoose.Types.ObjectId(req.body.user),
                visits: req.body.visits.map(function (visit) { return mongoose.Types.ObjectId(visit); })
            }
        },
        { upsert: true })
        .populate('user')
        .populate('visits')
        .then(plan => res.send(plan))
        .catch(error => res.send(error));
};
// Removes one plan
exports.delete = function (req, res) {
    let id = req.params.id;
    Plan.remove({ _id: id })
        .populate('user')
        .populate('visits')
        .then(plan => res.send(plan))
        .catch(error => res.send(error));
};