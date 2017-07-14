var Choice = require('./choice.model.js');

// Display list of all choices
exports.getChoices = function (req, res) {
    Choice.find()
        .then(choces => res.send(choices))
        .catch(error => res.send(error));
};
// Display list of all choices for a specific process
exports.getChoicesByProcess = function (req, res) {
    let process = req.params.process;
    Choice.find({ process: process })
        .then(choices => res.send(choices))
        .catch(error => res.send(error));
};
// Display one choice by id
exports.getOneChoiceById = function (req, res) {
    let id = req.params.id;
    Choice.find({ id: id })
        .then(choice => res.send(choice))
        .catch(error => res.send(error));
};
// Creates one choice
exports.addChoice = function (req, res) {
    const newChoice = new Choice({
        value: req.params.value,
        type: req.params.type
    });
    newChoice.save()
        .then(choice => res.send(choice))
        .catch(error => res.send(error));
};
// Updates one choice
exports.editChoice = function (req, res) {
    let id = req.params.id;
    Choice.update({ id: id },
        {
            $set: {
                value: req.params.value,
                type: req.params.type
            }
        },
        { upsert: true })
        .then(choice => res.send(choice))
        .catch(error => res.send(error));
};
// Removes one choice
exports.deleteChoice = function (req, res) {
    let id = req.params.id;
    Choice.remove({ id: id })
        .then(choice => res.send(choice))
        .catch(error => res.send(error));
};