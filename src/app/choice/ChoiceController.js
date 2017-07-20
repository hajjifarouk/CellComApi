var Choice = require('./choice.model.js');
var socketIO = global.socketIO;

// Display list of all choices
exports.get = function (req, res) {
    Choice.find()
        .then(choices => {
            global.socketIO.sockets.emit('choices_retreived',choices);
            res.send(choices);
        })
        .catch(error => res.send(error));
};
// Display list of all choices for a specific process
exports.getByProcess = function (req, res) {
    let process = req.params.process;
    Choice.find({ process: process })
        .then(choices => res.send(choices))
        .catch(error => res.send(error));
};
// Display one choice by id
exports.getOneById = function (req, res) {
    let id = req.params.id;
    Choice.find({ _id: id })
        .then(choice => res.send(choice))
        .catch(error => res.send(error));
};
// Creates one choice
exports.add = function (req, res) {
    const newChoice = new Choice({
        value: req.body.value,
        type: req.body.type
    });
    newChoice.save()
        .then(choice => res.send(choice))
        .catch(error => res.send(error));
};
// Updates one choice
exports.edit = function (req, res) {
    let id = req.params.id;
    Choice.update({ _id: id },
        {
            $set: {
                value: req.body.value,
                type: req.body.type
            }
        },
        { upsert: true })
        .then(choice => res.send(choice))
        .catch(error => res.send(error));
};
// Removes one choice
exports.delete = function (req, res) {
    let id = req.params.id;
    Choice.remove({ _id: id })
        .then(choice => res.send(choice))
        .catch(error => res.send(error));
};