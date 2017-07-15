var Plan = require('./plan.model.js');

// Display list of all plans
exports.get = function (req, res) {
    Plan.find({ process: process })
        .then(plans => res.send(plans))
        .catch(error => res.send(error));
};
// Display list of all plans for a specific process
exports.getByProcess = function (req, res) {
    let process = req.params.process;
    Plan.find({ process: process })
        .then(plans => res.send(plans))
        .catch(error => res.send(error));
};
// Display one plan by id
exports.getOneById = function (req, res) {
    let id = req.params.id;
    Plan.find({ _id: id })
        .then(plan => res.send(plan))
        .catch(error => res.send(error));
};
// Creates one plan
exports.add = function (req, res) {
    const newPlan = new Plan({
        date: req.body.date,
        user: req.body.user,
        visits: req.body.visits
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
                user: req.body.user,
                visits: req.body.visits
            }
        },
        { upsert: true })
        .then(plan => res.send(plan))
        .catch(error => res.send(error));
};
// Removes one plan
exports.delete = function (req, res) {
    let id = req.params.id;
    Plan.remove({ _id: id })
        .then(plan => res.send(plan))
        .catch(error => res.send(error));
};